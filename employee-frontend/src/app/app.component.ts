import { Component } from '@angular/core';
import { EmployeeTable } from './components/employee-table/employee-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeTable],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-frontend';
}