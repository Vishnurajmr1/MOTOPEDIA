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
  @Input() getAllMsg:any=[];
  @Output() messageSend:EventEmitter<string>=new EventEmitter<string>();
  message:string='';
  chatHistory:any;
  ngOnChanges(){
    console.log(this.chatData);
    console.log(this.getAllMsg);
  }
  sendMessage():void{
    if(this.message.trim()){
      this.messageSend.emit(this.message)
      this.message='';
    }
  }
}
