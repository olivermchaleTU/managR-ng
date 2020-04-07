import { Component, OnInit, Input } from '@angular/core';
import { ChartResponse } from 'src/app/utils/types/ChartTypes';
import { Label, Color } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { burndownOptions, burndownColors } from 'src/app/utils/config/ChartConfig';

@Component({
  selector: 'app-comparison-chart',
  templateUrl: './comparison-chart.component.html',
  styleUrls: ['./comparison-chart.component.css']
})
export class ComparisonChartComponent implements OnInit {

  @Input() data: ChartResponse;
  chartLabels: Label[];
  chartType: ChartType;
  chartLegend = true;
  chartData: ChartDataSets[] = [];
  chartOptions: ChartOptions;
  chartColors: Color[];
  constructor() { }

  ngOnInit() {
    this.chartLabels = this.data.dataLabels;
    this.chartData.push
    (
      { data: this.data.chartData.data, label: this.data.chartData.label},
      { data: this.data.chartComparisonData.data, label: this.data.chartComparisonData.label}
    );
    this.chartOptions = burndownOptions;
    this.chartOptions.title.text = this.data.chartTitle;
    this.chartType = 'line';
    this.chartColors = burndownColors;
  }

}
