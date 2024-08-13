import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid, List, ListItem, Divider, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Clock from './Clock';
import { useFibonacci } from './context/FibonacciContext';

export const Fibonacci = () => {
  const { fibonacciSr, showSeries, calculateFibonacci, history } = useFibonacci();
  const [showHistory, setShowHistory] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  const reversedFibonacciSr = [...fibonacciSr].reverse();

  const handleSendEmail = async () => {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;
    const subject = 'Prueba Técnica – Nombre Completo';
    const text = `
      Hora de generación: ${time}
      
      Serie Fibonacci:
      ${reversedFibonacciSr.join('\n')}
    `;

    const data = {
      personalizations: [
        {
          to: [{ email: 'recipient@example.com' }], // Reemplaza con el destinatario
          subject,
        },
      ],
      from: { email: 'your-email@example.com' }, // Asegúrate de usar un email verificado en SendGrid
      content: [
        {
          type: 'text/plain',
          value: text,
        },
      ],
    };

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `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`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (error) {
      setEmailStatus('error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Secuencia Fibonacci
      </Typography>
      <Clock />

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

      {/* Snackbar para mostrar el estado del envío del correo */}
      <Snackbar open={emailStatus === 'success'} autoHideDuration={6000} onClose={() => setEmailStatus(null)}>
        <Alert onClose={() => setEmailStatus(null)} severity="success">
          Correo enviado exitosamente!
        </Alert>
      </Snackbar>
      <Snackbar open={emailStatus === 'error'} autoHideDuration={6000} onClose={() => setEmailStatus(null)}>
        <Alert onClose={() => setEmailStatus(null)} severity="error">
          Error al enviar el correo.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Fibonacci;

/*import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid, List, ListItem, Divider } from '@mui/material';
import Clock from './Clock';
import { useFibonacci } from './context/FibonacciContext';

export const Fibonacci = () => {
  const { fibonacciSr, showSeries, calculateFibonacci, history } = useFibonacci();
  const [showHistory, setShowHistory] = useState(false);

  const reversedFibonacciSr = [...fibonacciSr].reverse();

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center">
        Secuencia Fibonacci
      </Typography>
      <Clock />

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
      </div>

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
    </Container>
  );
};

export default Fibonacci;*/

