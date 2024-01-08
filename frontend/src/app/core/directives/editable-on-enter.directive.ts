import { Directive, HostListener } from "@angular/core";
import { EditableComponent } from "../editable/editable.component";

@Directive({
    selector:'[editableOnEnter]'
})
export class EditableOnEnterDirective{
    constructor(private editable:EditableComponent){}
    @HostListener('keyup.enter')
onEnter(){
    this.editable.toViewMode();
}

}
