import { ChangeDetectionStrategy, Component,Input,Output,EventEmitter } from '@angular/core';
import { Tab } from 'src/app/shared/types';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TabContainerComponent {
  protected TabType:typeof Tab=Tab;
  @Input() currentTab!:Tab;
  @Output() tabSelected=new EventEmitter<Tab>();

  selectTab(page:Tab){
    this.tabSelected.emit(page)
  }
}
