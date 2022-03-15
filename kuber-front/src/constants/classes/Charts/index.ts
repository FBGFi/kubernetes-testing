import React from 'react';
import ICharts from './ICharts';
import { Root } from '@amcharts/amcharts5';
import { PieChart, PieSeries } from '@amcharts/amcharts5/percent';

// Adding charts this way does not really work, create custom hooks
export default class Charts implements ICharts {
	// private static root = Root;
	constructor() {

	}

	public static addPieChart(id: string) {
	}
}
