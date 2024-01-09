import { NgModule } from '@angular/core';
import { EditableComponent } from './editable.component';
import { ViewModeDirective } from '../directives/view-mode.directive';
import { EditModeDirective } from '../directives/edit-mode.directive';
import { FocusableDirective } from '../directives/focusable.directive';
import { EditableOnEnterDirective } from '../directives/editable-on-enter.directive';
import { AutoFocusDirective } from '../directives/autofocus.directive';

@NgModule({
  declarations: [
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    EditableOnEnterDirective,
    AutoFocusDirective
  ],
  exports: [EditableComponent,ViewModeDirective,EditModeDirective,FocusableDirective,EditableOnEnterDirective,AutoFocusDirective],
})
export class EditableModule {}
