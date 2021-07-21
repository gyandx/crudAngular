import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error-component/error-component.component';
import { EmployeeModule } from './views/employee/employee.module';
import { ManagerModule } from './views/manager/manager.module';

const routes: Routes = [
  {path: 'manager', loadChildren: () => import('./views/manager/manager.module').then(m => ManagerModule)},
  {path: '', redirectTo:'manager', pathMatch: 'full'},
  {path: '', loadChildren: () => import('./views/employee/employee.module').then(m => EmployeeModule)},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
