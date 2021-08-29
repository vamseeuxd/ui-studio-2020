import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appKeepElementInViewport]',
})
export class KeepElementInViewportDirective {
  constructor(private el: ElementRef) {
    const child: HTMLElement = el.nativeElement;
    child.style.opacity = '0';
    setTimeout(() => {
      const body: HTMLElement = document.body;
      const childRect: DOMRect = child.getBoundingClientRect();
      const bodyRect: DOMRect = body.getBoundingClientRect();
      if (childRect.right > bodyRect.width) {
        const excessPosition = childRect.right - bodyRect.width;
        child.style.marginLeft = `-${excessPosition + 20}px`;
      }

      // console.log(child.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode);
      if (childRect.bottom > window.innerHeight) {
        const excessPosition = childRect.bottom - window.innerHeight;
        child.style.marginTop = `-${excessPosition + 20}px`;
      }
      child.style.opacity = '1';
    });
  }
}
