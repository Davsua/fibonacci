import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid, List, ListItem, Divider, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Clock from './Clock';
import { useFibonacci } from './context/FibonacciContext';

export const Fibonacci = () => {

  /* Estados */
  const { fibonacciSr, showSeries, calculateFibonacci, history } = useFibonacci();
  const [showHistory, setShowHistory] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /** Invertir la secuencia*/
  const reversedFibonacciSr = [...fibonacciSr].reverse();

  /**
   * Enviar Email con la secuencia Fibonacci.
   *
   */
  const handleSendEmail = async () => {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;
    const subject = 'Prueba Técnica – Nombre Completo';
    const text = `
      Hora de generación: ${time}
      
      Serie Fibonacci:
      ${reversedFibonacciSr.join('\n')}
    `;

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'davidsuarezcarvajal98@gmail.com', 
          subject,
          text,
        }),
      });

      if (response.ok) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (error) {
      setEmailStatus('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  /**
   * Cierra la snackbar cambiando el estado a false.
   */
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Secuencia Fibonacci
      </Typography>

      {/**Reloj*/}
      <Clock />

    {/**Botones*/}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Button 
          variant="contained" 
          onClick={calculateFibonacci} 
          style={{ marginRight: '8px' }}
        >
          Calcular
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => setShowHistory(prev => !prev)}
        >
          {showHistory ? 'Ocultar Historial' : 'Ver Historial'}
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSendEmail}
          style={{ marginLeft: '8px' }}
        >
          Enviar por Correo
        </Button>
      </div>

      {/**Secuencia Actual*/}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {showSeries && (
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Secuencia Actual
              </Typography>
              <List style={{ padding: 0 }}>
                {reversedFibonacciSr.map((num, index) => (
                  <ListItem key={index} style={{ padding: '4px 0' }}>
                    {num}
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>

        {/**Historial de secuencias*/}

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px', height: showHistory ? 'auto' : '120px', overflow: 'hidden', transition: 'height 0.3s ease' }}>
            <Typography variant="h6" gutterBottom>
              Historial de Secuencias
            </Typography>
            {showHistory && (
              <List style={{ padding: 0 }}>
                {history.map(({ id, sequence }) => (
                  <div key={id}>
                    <List>
                      {sequence.map((num, index) => (
                        <ListItem key={index} style={{ padding: '4px 0' }}>
                          {num}
                        </ListItem>
                      ))}
                    </List>
                    <Divider style={{ margin: '8px 0' }} />
                  </div>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {/** Manejo de errores al enviar el correo */}
        <Alert onClose={handleCloseSnackbar} severity={emailStatus === 'success' ? 'success' : 'error'}>
          {emailStatus === 'success' ? 'Correo enviado con éxito!' : 'Error al enviar el correo.'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Fibonacci;

