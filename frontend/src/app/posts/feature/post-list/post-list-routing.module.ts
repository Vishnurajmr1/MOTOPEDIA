import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post-list.component";
import { NgModule } from "@angular/core";


const routes:Routes=[
    {
        path:'',
        component:PostListComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class postListComponentRoutingModule{}