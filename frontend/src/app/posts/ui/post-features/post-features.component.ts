import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-features',
  templateUrl: './post-features.component.html',
  styleUrls: ['./post-features.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeaturesComponent {

  isDropdownVisible:boolean=false;

  toggleDrop(){
    this.isDropdownVisible=!this.isDropdownVisible
  }
constructor(private renderer:Renderer2){}
  @ViewChild('dropdownDots')
  dropDownDots!: ElementRef;
  @ViewChild('dropdownMenuIconButton')
  dropdownMenuIconButton!: ElementRef;
  private globalClickListener!: () => void;

  toggleDropDown(){
    const dropDown=this.dropDownDots.nativeElement;
    const button=this.dropdownMenuIconButton.nativeElement;

    if(dropDown.classList.contains('hidden')){
      this.renderer.removeClass(dropDown,'hidden');
      this.globalClickListener=this.renderer.listen('window','click',(event)=>{
        if(!dropDown.contains(event.target) && !button.contains(event.target)){
          this.renderer.addClass(dropDown,'hidden');
        }
      })
    }else{
      this.renderer.addClass(dropDown,'hidden');
      if (this.globalClickListener) {
        this.globalClickListener();
      }
    }
  }

  ngOnDestroy(){
    if(this.globalClickListener){
      this.globalClickListener()
    }
  }
}
