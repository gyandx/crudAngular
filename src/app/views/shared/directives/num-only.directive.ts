import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumOnly]'
})
export class NumOnlyDirective {

  constructor(private el: ElementRef) { }

  // custom directive to get number only on input
  @HostListener('input', ['$event']) onInputChange(event): void {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
