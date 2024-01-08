import { Component, ContentChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { ViewModeDirective } from "../directives/view-mode.directive";
import { EditModeDirective } from "../directives/edit-mode.directive";
import { ReplaySubject, Subject, filter, from, fromEvent, switchMap, switchMapTo, take, takeUntil } from "rxjs";

@Component({
    selector:'editable',
    template:`<ng-container *ngTemplateOutlet="currentView"></ng-container>`
})
export class EditableComponent{
    @ContentChild(ViewModeDirective)
    viewModeTpl!: ViewModeDirective;
    @ContentChild(EditModeDirective)
    editModeTpl!:EditModeDirective;

    @Output() update=new EventEmitter<any>();

    editMode=new Subject();
    editMode$=this.editMode.asObservable();
    
    mode:'view'|'edit'='view';
    constructor(private host:ElementRef){}
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    ngOnInit(){
        this.viewModeTpl
    }
    toViewMode(){
        this.update.next('');
        this.mode='view'    
    }
    private get element(){
        return this.host.nativeElement;
    }
    private viewModeHandler(){
        fromEvent(this.element,'dblclick').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(()=>{
            this.mode='edit';
            this.editMode.next(true)
        })
    }
    private editModeHandler(){
        const clickOutside$=fromEvent(document,'click').pipe(filter(({target})=>this.element.contains(target)===false),take(1))
        this.editMode$.pipe(switchMapTo(clickOutside$),takeUntil(this.destroyed$)).subscribe(()=>this.toViewMode());
    }
    get currentView(){
        return this.mode==='view'?this.viewModeTpl.tpl:this.editModeTpl.tpl
    }

    ngOnDestroy(){
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
