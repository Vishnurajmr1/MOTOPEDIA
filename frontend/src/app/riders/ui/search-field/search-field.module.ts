import { NgModule } from "@angular/core";
import { SearchFieldComponent } from "./search-field.component";
import { CommonModule } from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms'
@NgModule({
    declarations:[
        SearchFieldComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[SearchFieldComponent]
})
export class SearchFieldModule{}