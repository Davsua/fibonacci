import React from 'react';
import { Typography, Paper } from '@mui/material';

const Clock = () => {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper elevation={2} style={{ padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
      <Typography variant="h5" component="div">
        {time}
      </Typography>
    </Paper>
  );
};

export default Clock;

/*import React from 'react'
import {useEffect, useState} from 'react'

export default function Clock() {

    const [time, setTime] = useState(new Date());

  useEffect(() => {

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); 

  }, []);

  return (
    <h2>Hora actual: {time.toLocaleTimeString()}</h2>
  )
}*/
