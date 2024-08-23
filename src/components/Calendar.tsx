import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Button, Input, Option, Select } from '@mui/joy';
import style from '@/app/(rotas-auth)/frequencia/calendar.module.css';
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
  const [eventType, setEventType] = useState<EventType>(EventType.Present);
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
    setEmployee(foundEmployee);
    setList(transformedEvents);
    updateHighlightedDays(transformedEvents, filter); // Atualizar os dias destacados com base nos eventos do funcionário encontrado
  } else {
    setEmployee(undefined);
    setList([]);
    setHighlightedDays([]); // Limpar os dias destacados se nenhum funcionário for encontrado
  }

  return foundEmployee;
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

  // Função para lidar com a pesquisa do funcionário
  function handleSearch() {
    const foundEmployee = getEmployee(Number(searchId));
    if (!foundEmployee) {
      // Limpar o estado se nenhum funcionário for encontrado
      setEmployee(undefined);
      setList([]);
      setHighlightedDays([]);
    }
  }

  // Adicionar evento na lista de eventos
  function addEvent() {
    if (employee && selectedDate) {
      const newEvent: Event = { day: selectedDate.format('DD/MM/YYYY'), type: eventType };
      const updatedEvents = [...list, newEvent];
      setList(updatedEvents);
      setEmployee({ ...employee, events: [...employee.events, newEvent] });
      updateHighlightedDays(updatedEvents, filter);
    }
  }

  // Remover evento da lista de eventos
  function removeEvent() {
    if (employee && selectedDate) {
      const eventToRemove = selectedDate.format('DD/MM/YYYY');
      const updatedEvents = list.filter(event => !(event.day === eventToRemove && event.type === eventType));
      setList(updatedEvents);
      setEmployee({ ...employee, events: updatedEvents });
      updateHighlightedDays(updatedEvents, filter);
    }
  }

  // Função para lidar com a mudança de data no DateCalendar
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  // Função para calcular a recorrência dos eventos
  const calculateRecurrence = () => {
    const recurrence = {
      [EventType.Present]: 0,
      [EventType.Absence]: 0,
      [EventType.Unjustified]: 0,
    };

    list.forEach(event => {
      recurrence[event.type]++;
    });

    return recurrence;
  };

  // Obter a recorrência atual dos eventos
  const recurrence = calculateRecurrence();

  return (
    <div className={style.filter}>
      <div className={style.form}>
        <h3>Pesquisar Funcionário por RF:</h3>
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
            <h4>Servidor Selecionado: {employee.name}</h4>
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
          <Select value={eventType} onChange={(event, value) => setEventType(value as EventType)} className={style.select_event}>
            <Option value={EventType.Present}>Presente 🔵</Option>
            <Option value={EventType.Absence}>Falta 🟠</Option>
            <Option value={EventType.Unjustified}>Falta Injustificada 🔴</Option>
          </Select>
          <div className={style.buttons}>
            <Button className={style.button_event} onClick={addEvent}>
              Adicionar Evento
            </Button>
            <Button className={style.button_event} onClick={removeEvent}>
              Remover Evento
            </Button>
          </div>
        </LocalizationProvider>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {employee && (
          <>
            <div className={style.calendar}>
              <DateCalendar
                className={style.calendar}
                value={selectedDate} 
                onChange={handleDateChange}
                renderLoading={() => <DayCalendarSkeleton />} // Usando o renderLoading para esqueleto do calendário
                slots={{
                  day: (dayProps) => (
                    <ServerDay {...dayProps} highlightedDays={highlightedDays} filter={filter} />
                  ),
                }}
              />
              <div >
                <h4 className={style.calendar_info}>Recorrência do Evento:</h4>
                <p className={style.calendar_info}>Presenças: {recurrence.present}</p>
                <p className={style.calendar_info}>Faltas: {recurrence.absence}</p>
                <p className={style.calendar_info}>Faltas Injustificadas: {recurrence.unjustified}</p>
              </div>
            </div>
          </>
        )}
      </LocalizationProvider>
    </div>
  );
}
