import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmployeePieChartComponent } from '../employee-pie-chart.component';

interface TimeEntry {
  EmployeeName: string;
  StarTimeUtc: string;
  EndTimeUtc: string;
}

interface EmployeeSummary {
  name: string;
  totalHours: number;
}

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, EmployeePieChartComponent],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTable implements OnInit {
  employeeData: EmployeeSummary[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

    this.http.get<TimeEntry[]>(apiUrl).subscribe(data => {
      console.log('✅ Podaci stigli:', data);
      const grouped: { [key: string]: number } = {};

      data.forEach(entry => {
        const timeIn = new Date(entry.StarTimeUtc);
        const timeOut = new Date(entry.EndTimeUtc);
        const hours = (timeOut.getTime() - timeIn.getTime()) / 36e5;

        if (!grouped[entry.EmployeeName]) {
          grouped[entry.EmployeeName] = 0;
        }

        grouped[entry.EmployeeName] += hours;
      });

      this.employeeData = Object.entries(grouped)
        .map(([name, totalHours]) => ({ name, totalHours }))
        .sort((a, b) => b.totalHours - a.totalHours);

      this.loading = false;
    });
  }
}
