import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

export const burndownOptions: ChartOptions = {
    responsive: true,
    title: {
        display: true,
        text: 'Chart Loading...'
    },
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Day'
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Hours'
            },
            ticks: {
                beginAtZero: true
            }
        }],
    }
};

export const burndownColors: Color[] = [
    { // managR-blue
        backgroundColor: 'rgba(74, 226, 248, 0.2)',
        borderColor: 'rgba(74, 226, 248, 1)',
        pointBackgroundColor: 'rgba(74, 226, 248, 0.2)',
        pointBorderColor: 'rgba(74, 226, 248, 1)',
        pointHoverBackgroundColor: 'rgba(74, 226, 248, 0.2)',
        pointHoverBorderColor: 'rgba(74, 226, 248, 1)'
      },
      { // managR-purple
        backgroundColor: 'rgba(170, 98, 227, 0.2)',
        borderColor: 'rgba(170, 98, 227, 1)',
        pointBackgroundColor: 'rgba(170, 98, 227, 0.2)',
        pointBorderColor: 'rgba(170, 98, 227, 1)',
        pointHoverBackgroundColor: 'rgba(170, 98, 227, 0.2)',
        pointHoverBorderColor: 'rgba(170, 98, 227, 1)'
      },
]