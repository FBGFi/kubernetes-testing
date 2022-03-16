import { Button } from '@mui/material';
// import Charts from 'constants/classes/Charts';
import { ease, Root } from '@amcharts/amcharts5';
import { PieChart, PieSeries } from '@amcharts/amcharts5/percent';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import React, { useState } from 'react';
import './ChartsWithClass.css';

type TChartsWithClassProps = {

}

// this is useless
const usePieChartWithUpdate: React.FC<{ id: string, count: number }> = ({ id, count }) => {
	const [roots, setRoot] = useState<null | Root>(null);
	React.useEffect(() => {

	}, [count, roots]);
	React.useEffect(() => {
		const root = Root.new(id);
		setRoot(roots);
		if (root) {
			root.setThemes([am5themes_Animated.new(root)]);
			root.fps = 30;
			const chart = root.container.children.push(PieChart.new(root, {}));
			const series = chart.series.push(PieSeries.new(root, {
				valueField: "value",
				categoryField: "category"
			}));
			series.data.setAll([{
				category: "Research",
				value: 1000 * count
			}, {
				category: "Marketing",
				value: 1200 + (100 * count)
			}, {
				category: "Sales",
				value: 850 - (100 * count)
			}]);
			series.animate({
				key: "startAngle",
				to: 180,
				loops: Infinity,
				duration: 2000,
				easing: ease.yoyo(ease.cubic)
			})
		}
	}, [])
	return (
		<div id={id}></div>
	);
}

// custom hook
function usePieChart(id: string, count: number) {
	const [prevCount, setPrevCount] = useState(count);
	React.useEffect(() => {
		const root = Root.new(id);
		root.setThemes([am5themes_Animated.new(root)]);
		root.fps = 30;
		const chart = root.container.children.push(PieChart.new(root, {}));
		const series = chart.series.push(PieSeries.new(root, {
			valueField: "value",
			categoryField: "category"
		}));
		const data = [{
			category: "Research",
			value: 1000 * prevCount
		}, {
			category: "Marketing",
			value: 1200 + (100 * prevCount)
		}, {
			category: "Sales",
			value: 850 - (100 * prevCount)
		}]
		series.data.setAll(data);

		// animations
		series.data.setIndex(0, {
			category: "Research",
			value: 1000 * count,
		});
		series.data.setIndex(1, {
			category: "Marketing",
			value: 1200 + (100 * count)
		});
		series.data.setIndex(2, {
			category: "Sales",
			value: 850 - (100 * count)
		});
		if(process.env.REACT_APP_ENV === "cypress") series.slices.template.setAll({focusable: true, isMeasured: true, ariaLabel: "Slice; {category} {value}"})
		setPrevCount(count);
		return (() => {
			root.dispose();
		})
	}, [count])
}

const ChartsWithClass: React.FC<TChartsWithClassProps> = (props) => {
	const [count, setCount] = useState(0);
	const [count2, setCount2] = useState(0);
	usePieChart("chart", count);
	
	return (
		<div className='ChartsWithClass'>
			<div id="chart"></div>
			<Button onClick={() => setCount(count + 1)}>Add {count}</Button>
			<Button onClick={() => setCount2(count2 + 1)}>Add {count2}</Button>
			{/* {usePieChartWithUpdate({ id: "chart2", count })} */}
		</div>
	);
}

export type { TChartsWithClassProps };
export { };
export default ChartsWithClass;
