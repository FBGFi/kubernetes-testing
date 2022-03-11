import React from 'react';
import './App.css';

import { io } from 'socket.io-client';
import { SocketClass } from './constants/classes/SocketClient';

const App = () => {
  const [apiResponse, setApiResponse] = React.useState<string[]>([]);
  const requests = 20;

  React.useEffect(() => {
    if(apiResponse.length < requests){
      fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(data => setApiResponse(apiResponse.concat([data.data])))
    }
  }, [apiResponse])

  return (
    <div className="App">
      {apiResponse.map(res => <p>{res}</p>)}
    </div>
  );
}

export default App;
