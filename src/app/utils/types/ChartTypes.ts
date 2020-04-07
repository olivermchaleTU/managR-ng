export class ChartResponse {
    dataLabels: string[];
    chartTitle: string;
    chartData: ChartDataSet;
    chartComparisonData: ChartDataSet;
}

export class ChartDataSet {
    data: number[];
    label: string;
}

export class AnaltyicsResponse {
    totalStories: number;
    completeStories: number;
    totalTasks: number;
    completeTasks: number;
    estimatedHours: number;
    loggedHours: number;
    boardTitle: number;
    startDate: Date;
    endDate: Date;
}
