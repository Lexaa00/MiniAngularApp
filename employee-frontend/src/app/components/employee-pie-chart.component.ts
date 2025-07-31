import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

interface EmployeeSummary {
  name: string;
  totalHours: number;
}

@Component({
  selector: 'app-employee-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="employeeData.length > 0" style="display: flex; justify-content: center; margin-top: 30px;">
      <canvas #chartCanvas style="width: 300px; height: 300px;"></canvas>
    </div>
    <div *ngIf="employeeData.length === 0" style="text-align: center;">
      No data available for chart.
    </div>
  `
})
export class EmployeePieChartComponent implements OnChanges {
  @Input() employeeData: EmployeeSummary[] = [];
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeData'] && this.employeeData.length > 0) {
      setTimeout(() => this.initOrUpdateChart(), 0);
    }
  }

  initOrUpdateChart() {
    const ctx = this.chartCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const labels = this.employeeData.map(emp => emp.name);
    const data = this.employeeData.map(emp => emp.totalHours);

    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    } else {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Hours Worked',
            data,
            backgroundColor: [
              '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
              '#4bc0c0', '#9966ff', '#ff9f40'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    }
  }
}
