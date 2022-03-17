import React from 'react';
import './App.css';
import { Button } from '@mui/material';

import { io } from 'socket.io-client';
import { SocketClass } from './constants/classes/SocketClient';
import ChartTest from 'components/ChartTest';
import ChartsWithClass from 'components/ChartsWithClass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from 'pages/TestPage';

const App = () => {
  const [apiResponse, setApiResponse] = React.useState<string[]>([]);
  const requests = 20;

  React.useEffect(() => {
    if (apiResponse.length < requests) {
      fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(data => setApiResponse(apiResponse.concat([data.data])))
    }
  }, [apiResponse]);

  React.useEffect(() => {

  })

  return (
    <div className="App">
      {/* <p>learn react</p>
      <Button>testi</Button>
      {apiResponse.map(res => <p>{res}</p>)}
      <ChartTest /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<ChartsWithClass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
