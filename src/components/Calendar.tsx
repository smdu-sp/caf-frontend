import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Button, Input, Option, Select } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import style from '@/style/calendar.module.css';
import CalendarService from '@/services/Calendar';
import { useState } from 'react';

// Definindo o enum para os tipos de evento
enum EventType {
  Present = 'present',
  Absence = 'absence',
  Unjustified = 'unjustified'
}

// Definindo o tipo para os eventos usando o enum
type Event = {
  day: string;
  type: EventType;
};

// Definindo o tipo para os funcionários
type Employee = {
  id: number;
  name: string;
  events: { type: string; day: string }[];
}

// Componente para exibir os dias destacados com base nos eventos
const ServerDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: Dayjs[], filter: EventType }) => {
  const { highlightedDays = [], day, outsideCurrentMonth, filter, ...other } = props;

  // Verifica se o dia está selecionado entre os dias destacados
  const isSelected = !outsideCurrentMonth && highlightedDays.some(d => d.isSame(day, 'day'));

  // Determina o conteúdo do Badge com base no tipo de evento
  let badgeContent = undefined;
  switch (filter) {
    case EventType.Present:
      badgeContent = isSelected ? '🔵' : undefined;
      break;
    case EventType.Absence:
      badgeContent = isSelected ? '🟠' : undefined;
      break;
    case EventType.Unjustified:
      badgeContent = isSelected ? '🔴' : undefined;
      break;
    default:
      break;
  }

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={badgeContent}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

export default function Calendar() {
  const [filter, setFilter] = useState<EventType>(EventType.Present);
  const [searchId, setSearchId] = useState<string>('');
  const [employee, setEmployee] = useState<Employee>();
  const [highlightedDays, setHighlightedDays] = useState<Dayjs[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [list, setList] = useState<Event[]>([]);

  // Função para atualizar o estado do SearchId
  const handleSearchIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  // Função para atualizar o estado do Filter usando o enum
  const handleFilterChange = (event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, value: EventType | null) => {
    if (value) {
      setFilter(value);
      if (employee) {
        // Atualizar os dias destacados com base no novo filtro
        updateHighlightedDays(list, value);
      }
    }
  };

  // Função para obter o funcionário pelo ID
  function getEmployee(id: number): Employee | undefined {
    const employeeList = CalendarService.get_employee();
    const foundEmployee = employeeList.find((employee) => employee.id === id);
    
    if (foundEmployee) {
      const transformedEvents = transformEvents(foundEmployee.events);
      setList(transformedEvents);
    }

    return foundEmployee;
  }

  // Adicionar o novo evento
  function addDay() {
    if (selectedDate) {
      const newHighlightedDays = [...highlightedDays, selectedDate];
      setHighlightedDays(newHighlightedDays);
    }
  }

  // Função para transformar e filtrar os eventos no tipo esperado usando o enum
  function transformEvents(events: { type: string, day: string }[]): Event[] {
    return events.filter((event): event is Event =>
      Object.values(EventType).includes(event.type as EventType)
    ).map((event) => ({
      ...event,
      type: event.type as EventType
    }));
  }

  // Função para atualizar os dias destacados com base nos eventos filtrados
  function updateHighlightedDays(events: Event[], filter: EventType) {
    const filteredEvents = events.filter(event => event.type === filter);
    const days = filteredEvents.map(event => dayjs(event.day, 'DD/MM/YYYY'));
    setHighlightedDays(days);
  }

  // Função para realizar a busca do funcionário e atualizar os eventos
  function handleSearch() {
    const foundEmployee = getEmployee(Number(searchId));
    if (foundEmployee) {
      setEmployee(foundEmployee);

      // Atualizar os dias destacados com base nos eventos do funcionário e no filtro atual
      updateHighlightedDays(list, filter);
    } else {
      setEmployee(undefined);
      setHighlightedDays([]); // Limpar os dias destacados se nenhum funcionário for encontrado
    }
  }

  // Adicionar evento na lista de eventos
  function addEvent(){
    const response: Event[] = [];
    employee?.events 
    console.log(selectedDate)
  }

  // Função para lidar com a mudança de data no DateCalendar
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <div className={style.filter}>
      <div className={style.form}>
        <h3>Pesquisar Funcionário por ID:</h3>
        <div className={style.search}>
          <Input
            type="text"
            placeholder="Digite o ID do funcionário"
            value={searchId}
            onChange={handleSearchIdChange}
            className={style.input}
          />
          <Button className={style.s_button} onClick={handleSearch}>Pesquisar</Button>
        </div>
        {employee && (
          <div>
            <h4>Funcionário Selecionado: {employee.name}</h4>
          </div>
        )}
        <h3>Filtrar por Tipo:</h3>
        <Select value={filter} defaultValue={EventType.Present} onChange={(event, value) => handleFilterChange(event, value as EventType)}>
          <Option value={EventType.Present}>Presente 🔵</Option>
          <Option value={EventType.Absence}>Falta 🟠</Option>
          <Option value={EventType.Unjustified}>Falta Injustificada 🔴</Option>
        </Select>
        <h3>Adicionar Evento:</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className={style.datapicker}
            label="Selecione a data"
            value={selectedDate}
            onChange={handleDateChange} 
          />
          <Select defaultValue={EventType.Present} className={style.select_event}>
            <Option value={EventType.Present}>Presente 🔵</Option>
            <Option value={EventType.Absence}>Falta 🟠</Option>
            <Option value={EventType.Unjustified}>Falta Injustificada 🔴</Option>
          </Select>
          <Button className={style.button_event} onClick={addEvent}>
            Adicionar Evento
          </Button>
        </LocalizationProvider>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {employee && (
          <DateCalendar
            className={style.calendar}
            value={selectedDate} 
            onChange={handleDateChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: (props) => <ServerDay {...props} highlightedDays={highlightedDays} filter={filter} />,
            }}
          />
        )}
      </LocalizationProvider>
    </div>
  );
}
