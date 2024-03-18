import React, { useState } from 'react';
import {Container, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pass');
      console.log(response.data)
      setMessage(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
    <Container  style={{
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'center',
      paddingTop: 50,
    }}>
      <Stack direction="column" spacing={2} >
        <h1>React Frontend</h1>
        <Button variant="outlined" endIcon={<SendIcon />} onClick={handleClick} style={{
          display: 'center',
          alignItems: 'center',
          }}>Get Message</Button>
        <p>Received message: {message}</p>
      </Stack>
    </Container>
  );
}

export default App;