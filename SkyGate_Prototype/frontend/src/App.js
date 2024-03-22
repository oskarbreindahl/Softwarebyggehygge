import React, { useState } from 'react';
import {Container, Button, Stack, Typography, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function App() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [id, setID] = useState('');
  const [boardingPass, setBoardingPass] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const getPassButton = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getPass/' 
      + first_name + '/'
      + last_name + '/' 
      + id);
      console.log(response.data)
      setBoardingPass(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };
  const verifyPassButton = async () => {
    try {
      const response = await axios.get('http://localhost:3001/verifyPass/'
      + first_name + '/'
      + last_name + '/' 
      + id);
      console.log(response.data)
      const res = JSON.stringify(response.data)
      setResultMessage(JSON.stringify(response.data));

    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };
  const corruptPassButton = async () => {
    try {
      const response = await axios.get('http://localhost:3001/verifyPass/'
      + first_name + '/'
      + last_name + '/' 
      + id + "1298312983");
      console.log(response.data)
      const res = JSON.stringify(response.data)
      setResultMessage(JSON.stringify(response.data));

    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };
  const corruptDBButton = async () => {
    try {
      const response = await axios.get('http://localhost:3001/corruptDB/'
      + first_name + '/'
      + last_name + '/' 
      + id);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  return (
    <Container  style={{
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'center',
      paddingTop: 50,
    }}>
      <Stack direction="column" spacing={2} >
        <Typography variant="h2" gutterBottom>
          SkyGate Boarding Pass Service
        </Typography>
        <TextField id="standard-basic" onChange={handleFirstNameChange} value={first_name} label="First name" variant="standard" />
        <TextField id="standard-basic" onChange={handleLastNameChange} value={last_name} label="Last name" variant="standard" />
        <TextField id="standard-basic" onChange={handleIDChange} value={id} label="ID" variant="standard" />
        <Button variant="outlined" onClick={getPassButton} style={{
          display: 'center',
          alignItems: 'center',
          }}>Get boarding pass</Button>
        <Typography variant="p" gutterBottom>
          Your boarding pass: {boardingPass}
        </Typography>  
        <Button variant="outlined" onClick={verifyPassButton} style={{
          display: 'center',
          alignItems: 'center',
          }}>Verify boarding pass</Button>
          <Button variant="outlined" onClick={corruptPassButton} style={{
          display: 'center',
          alignItems: 'center',
          }}>Corrupt boarding pass</Button>
        <p>Verified: {resultMessage}</p> 
        <Button variant="outlined" onClick={corruptDBButton} style={{
          display: 'center',
          alignItems: 'center',
          }}>Corrupt database</Button>       
      </Stack>
    </Container>
  );
}

export default App;