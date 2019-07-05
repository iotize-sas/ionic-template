import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollCatcher]'
})
export class ScrollCatcherDirective {

  private scrollElement: HTMLElement;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.scrollElement = this.el.nativeElement.getElementsByClassName(
      'scroll-content',
    )[0];
    this.scrollElement.addEventListener(
      'touchstart',
      (event: TouchEvent) => {
        event.stopImmediatePropagation();
        event.cancelBubble = true;
      },
    );

    this.scrollElement.addEventListener('touchend', (event: TouchEvent) => {
      event.stopImmediatePropagation();
      event.cancelBubble = true;
    });
  }

}
