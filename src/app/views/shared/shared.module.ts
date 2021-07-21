import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { NumOnlyDirective } from './directives/num-only.directive';



@NgModule({
  declarations: [
    AlertComponent,
    NumOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[AlertComponent, NumOnlyDirective]
})
export class SharedModule { }
