import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ChartResponse, AnaltyicsResponse } from 'src/app/utils/types/ChartTypes';
import Swal from 'sweetalert2';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TouchSequence } from 'selenium-webdriver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {

  burndownLoading = true;
  progressLoading = true;
  analyticsLoading = true;
  storyPercent;
  taskPercent;
  $routeParams: Subscription;
  $burndownChartData: Subscription;
  $progressChartData: Subscription;
  $analyticsData: Subscription;
  burndownChartResponse: ChartResponse;
  progressChartResponse: ChartResponse;
  id: string;
  analytics: AnaltyicsResponse;
  faSpinner: IconDefinition = faSpinner;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chartService: ChartService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getBurndownChartData();
      this.getProgressChartData();
      this.getAnalytics();
    });
  }

  getBurndownChartData() {
    this.$burndownChartData = this.chartService.getBurndownChart(this.id).subscribe(
      resp => this.handleBurndownChartResponse(resp),
      err => this.handleChartError(err)
    );
  }

  handleChartError(err: any): void {
    this.burndownLoading = false;
    this.progressLoading = false;
    console.error('chart error: ' + err);
    Swal.fire({
      title: 'Error',
      text: 'Failed to get chart data',
      icon: 'error',
      confirmButtonText: 'Ok',
    }).then(clicked => {
      this.router.navigate(['./board']);
    });
  }
  handleBurndownChartResponse(resp: ChartResponse): void {
    this.burndownChartResponse = resp;
    this.burndownLoading = false;
  }

  getProgressChartData() {
    this.$progressChartData = this.chartService.getProgressChart(this.id).subscribe(
      resp => this.handleProgressChartResponse(resp),
      err => this.handleChartError(err)
    );
  }

  handleProgressChartResponse(resp: ChartResponse): void {
    this.progressChartResponse = resp;
    this.progressLoading = false;
  }

  getAnalytics() {
    this.$analyticsData = this.chartService.getAnalytics(this.id).subscribe(
      resp => this.handleAnalyticsResponse(resp),
      err => this.handleChartError(err)
    );
  }

  handleAnalyticsResponse(resp: AnaltyicsResponse) {
    this.analytics = resp;
    this.storyPercent = ((resp.completeStories / resp.totalStories) * 100);
    this.taskPercent = (resp.completeTasks / resp.totalTasks) * 100;
    this.analyticsLoading = false;
  }

  ngOnDestroy() {
    if (this.$burndownChartData) {
      this.$burndownChartData.unsubscribe();
    }
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
    if (this.$progressChartData) {
      this.$progressChartData.unsubscribe();
    }
    if (this.$analyticsData) {
      this.$analyticsData.unsubscribe();
    }
  }

  getDateString(date: Date) {
    return new Date(date).toDateString();
  }

  getBackgroundColor() {
    if (this.themeService.isDarkTheme() === false) {
      return '#f6f8f9';
    }
    return '#1e1e1e';
  }

  getTextColor() {
    if (this.themeService.isDarkTheme() === false) {
      return 'black';
    }
    return 'white';
  }
}
