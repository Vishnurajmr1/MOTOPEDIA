import {
  ViewContainerRef,
  ComponentRef,
  Injectable,
  ApplicationRef,
  Injector,
  Type,
  EmbeddedViewRef,
} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ModalService <T> {
  private componentRef: ComponentRef<T> | undefined;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  async open(component: Type<T>): Promise<void> {
    if (this.componentRef) {
      return;
    }
    this.componentRef = this.viewContainerRef.createComponent(component);
    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  async close():Promise<void>{
    if(!this.componentRef)return;

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef=undefined
  }
}
