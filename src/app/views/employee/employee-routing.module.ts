import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { EmployeeGuardGuard } from "./employee-guard.guard";
import { EmployeeComponent } from "./employee/employee.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {path: 'employee' , component: EmployeeComponent, canActivate:[EmployeeGuardGuard] ,children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule {}
