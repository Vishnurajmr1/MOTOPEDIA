import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDetailComponent {
  @Input() messageRecieved!:boolean;
  @Input() chatData:any;
  @Output() messageSend:EventEmitter<string>=new EventEmitter<string>();
  message:string='';

  ngOnChanges(){
    console.log(this.chatData);
  }
  sendMessage():void{
    if(this.message.trim()){
      this.messageSend.emit(this.message)
      this.message='';
    }
  }
}
