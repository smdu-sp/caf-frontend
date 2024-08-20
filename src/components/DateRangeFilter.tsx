import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Popper from '@mui/material/Popper';

const DateRangeFilter: React.FC<{ onFilter: (startDate: Date | null, endDate: Date | null) => void }> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [anchorElStart, setAnchorElStart] = useState<null | HTMLElement>(null);
  const [anchorElEnd, setAnchorElEnd] = useState<null | HTMLElement>(null);

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };

  React.useEffect(() => {
    onFilter(startDate, endDate);
  }, [startDate, endDate, onFilter]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <TextField
          label="Start Date"
          value={startDate ? startDate.toISOString().substring(0, 10) : ''}
          onClick={(e) => setAnchorElStart(e.currentTarget)}
        />
        <Popper open={Boolean(anchorElStart)} anchorEl={anchorElStart} placement="bottom-start">
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            onClose={() => setAnchorElStart(null)}
          />
        </Popper>

        <TextField
          label="End Date"
          value={endDate ? endDate.toISOString().substring(0, 10) : ''}
          onClick={(e) => setAnchorElEnd(e.currentTarget)}
        />
        <Popper open={Boolean(anchorElEnd)} anchorEl={anchorElEnd} placement="bottom-start">
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            onClose={() => setAnchorElEnd(null)}
          />
        </Popper>
      </div>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;
