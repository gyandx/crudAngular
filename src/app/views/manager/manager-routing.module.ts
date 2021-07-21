import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerResolver } from './manager-resolver.service';
import { ManagerComponent } from './manager.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent, resolve: {managerData: ManagerResolver}},
  {path: 'sign-up', component: SignUpComponent, resolve: {managerData: ManagerResolver}}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {
}
