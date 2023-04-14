import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private element: ElementRef) { }

  @HostListener('input') onInput() {
    const value = this.element.nativeElement.value.toUpperCase();
    this.element.nativeElement.value = value;
  }

}
