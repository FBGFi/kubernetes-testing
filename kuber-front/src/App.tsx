import React from 'react';
import './App.css';
import {Root} from '@amcharts/amcharts5';
import {PieChart, PieSeries} from '@amcharts/amcharts5/percent'
import {Button} from '@mui/material';

import { io } from 'socket.io-client';
import { SocketClass } from './constants/classes/SocketClient';

const App = () => {
  const [apiResponse, setApiResponse] = React.useState<string[]>([]);
  const requests = 20;
  const chartRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (apiResponse.length < requests) {
      fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(data => setApiResponse(apiResponse.concat([data.data])))
    }
  }, [apiResponse]);

  React.useEffect(() => {
    if(process.env.NODE_ENV !== "test"){
      const root = Root.new("chartdiv");
      const chart = root.container.children.push(PieChart.new(root, {}));
      const series = chart.series.push(PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      }));
      series.data.setAll([{
        category: "Research",
        value: 1000
      }, {
        category: "Marketing",
        value: 1200
      }, {
        category: "Sales",
        value: 850
      }]);
    }
  })

  return (
    <div className="App">
      <p>learn react</p>
      <Button>testi</Button>
      <div ref={chartRef} id="chartdiv"></div>
      {apiResponse.map(res => <p>{res}</p>)}
    </div>
  );
}

export default App;
