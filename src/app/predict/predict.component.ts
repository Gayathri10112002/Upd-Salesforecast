import { Component , OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit{
  private file!: File;
  private periodicity!: string;
  private periods!: number;
   csvData: string[][] = [];

constructor(private auth:AuthService,private http: HttpClient,private router: Router){

}

  ngOnInit(): void{
this.auth.canAccess();
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('csvFile', this.file);
    formData.append('periodicity', this.periodicity);
    formData.append('periods', this.periods.toString());

    this.http.post('http://127.0.0.1:5000', formData, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('File uploaded successfully');
        let lines=response.split('\n');
        let met=lines.slice(0,4).join('\n');
        console.log(met);
        this.csvData = this.parseCSV(response);
        this.router.navigate(['/dashboard'], { state: { chartData: this.csvData , metric:met} });

      },
      (error) => {
        console.error('File upload failed',error.message);
      }
    );
  }
  onPeriodicityChange(event: any): void {
    this.periodicity = event.target.value;
  }

  onPeriodsChange(event: any): void {
    this.periods = event.target.value;
  }
  private parseCSV(csv: string): string[][] {
    const rows: string[] = csv.split('\n');
    const data: string[][] = [];
    rows.forEach(row => {
      data.push(row.split(','));
    });
    return data;
  }

  
}