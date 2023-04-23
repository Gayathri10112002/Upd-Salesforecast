import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as powerbi from 'powerbi-client';

const embedConfig = {
  type: 'dashboard',
  id: '<your-dashboard-id>',
  embedUrl: '<your-dashboard-embed-url>',
  accessToken: '<your-access-token>'
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public labels: string[] = [];
  public datas: number[] = [];
    chartData: any = [];
    metrics: any=[];
  

constructor(private auth:AuthService,private http: HttpClient, private router: Router,private route: ActivatedRoute){}

chatdata = {
  labels: this.labels,
  datasets: [{
    label: 'Sales',
    data: this.datas,
    fill: false,
    borderColor: '#1D2671 ',
    pointBackgroundColor:'#C33764',
    tension: 0.2
  }]
};

ngOnInit(): void {
  this.chartData = history.state.chartData;
    
  this.chartData=this.chartData.slice(5)
  this.chartData.map((row: any) => {
  // Check if the row is not an empty array
  if (row.length > 1) {
    this.labels.push(row[0] as string); // Cast row[0] to string and push onto labelss
    this.datas.push(Number(row[1]) as number);  // Add the second element of the row as a number to the data array
  
  this.auth.canAccess();
}
this.metrics=history.state.metric;

  });
  console.log('Chart Data:', this.chartData);


}
}