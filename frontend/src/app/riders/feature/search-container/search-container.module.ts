import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SearchContainerComponent } from "./search-container.component";
import { SearchUserList } from "src/app/riders/ui/search-user-list/search-user-list.module";
import { ModalModule } from "src/app/shared/ui/modal/modal.module";
import { SearchFieldModule } from "../../ui/search-field/search-field.module";

@NgModule({
    declarations:[
        SearchContainerComponent
    ],
    imports:[
        CommonModule,
        SearchUserList,
        ModalModule,
        SearchFieldModule
    ],
    exports:[SearchContainerComponent]
})

export class SearchContainerModule{}