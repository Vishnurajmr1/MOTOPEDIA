import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[HideScrollbar]',
})
export class HideScrollbarDirective {
  constructor(private elRef: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {
    this.render.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
    this.render.setStyle(this.elRef.nativeElement, 'height', '300px');
    this.render.setStyle(this.elRef.nativeElement, 'scrollbar-width', 'none');
    this.render.setStyle(
      this.elRef.nativeElement,
      '-ms-overflow-style',
      'none'
    );
    this.render.setStyle(
      this.elRef.nativeElement,
      '::-webkit-scrollbar',
      'display:none'
    );
  }
}
