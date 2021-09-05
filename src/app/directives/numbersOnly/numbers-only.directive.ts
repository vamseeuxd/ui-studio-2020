import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  regexStr = '^[0-9]+$';
  constructor(private el: ElementRef) {}
  /* @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    return new RegExp(this.regexStr).test(event.key);
  } */

  @HostListener('textInput', ['$event'])
  onKeyup(event: any) {
    return new RegExp(this.regexStr).test(event.data);
  }

  @HostListener('paste', ['$event'])
  blockPaste(event: ClipboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData
      ?.getData('text/plain')
      .replace(/[^0-9]/g, '');
    document.execCommand('insertHTML', false, pasteData);
  }

}
