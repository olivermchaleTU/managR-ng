import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChartResponse, AnaltyicsResponse } from 'src/app/utils/types/ChartTypes';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = `${environment.storyServiceBaseUrl}`;

  constructor(private http: HttpClient) { }

  getBurndownChart(id: string) {
    return this.http.get<ChartResponse>(`${this.baseUrl}charts/getBurndownChart?id=${id}`);
  }

  getProgressChart(id: string) {
    return this.http.get<ChartResponse>(`${this.baseUrl}charts/getProgressChart?id=${id}`);
  }

  getAnalytics(id: string) {
    return this.http.get<AnaltyicsResponse>(`${this.baseUrl}charts/getAnalytics?id=${id}`);
  }

}
