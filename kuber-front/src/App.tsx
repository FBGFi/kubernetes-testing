import React from 'react';
import './App.css';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent'

import { io } from 'socket.io-client';
import { SocketClass } from './constants/classes/SocketClient';

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
    const root = am5.Root.new("chartdiv");
    const chart = root.container.children.push(am5percent.PieChart.new(root, {}));
    const series = chart.series.push(am5percent.PieSeries.new(root, {
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
  })

  return (
    <div className="App">
      <div id="chartdiv"></div>
      {apiResponse.map(res => <p>{res}</p>)}
    </div>
  );
}

export default App;
