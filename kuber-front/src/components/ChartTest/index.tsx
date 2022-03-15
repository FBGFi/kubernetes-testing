import React from 'react';
import './ChartTest.css';

import { Root } from '@amcharts/amcharts5';
import { PieChart, PieSeries } from '@amcharts/amcharts5/percent'

type TChartTestProps = {

}

type TChartProps = {
	id: string
}

const Chart: React.FC<TChartProps> = props => {
	React.useEffect(() => {
		const root = Root.new("chart-" + props.id);
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
	})
	return (
		<div id={"chart-" + props.id}></div>
	)
}

const ChartTest: React.FC<TChartTestProps> = (props) => {
	const buildChart = (id: string) => {
		const root = Root.new(id);
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
		return "";
	}
	return (
		<div className='ChartTest'>
			{process.env.NODE_ENV === 'test' || <Chart id="chartdiv" />}
			{/* This does not work
				<div id="chart2">{process.env.NODE_ENV === 'test' ? "Testing" : buildChart("chart2")}</div> 
			*/}
		</div>
	);
}

export type { TChartTestProps };
export { };
export default ChartTest;
