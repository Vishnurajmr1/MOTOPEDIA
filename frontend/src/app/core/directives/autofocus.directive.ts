import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
selector:'[appAutofocus]'
})
export class AutoFocusDirective{
    private elementRef:ElementRef=inject(ElementRef);

    ngOnInit(){
        this.elementRef.nativeElement.focus();
    }
}