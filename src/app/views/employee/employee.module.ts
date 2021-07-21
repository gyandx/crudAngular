import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    EmployeeComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class EmployeeModule { }
