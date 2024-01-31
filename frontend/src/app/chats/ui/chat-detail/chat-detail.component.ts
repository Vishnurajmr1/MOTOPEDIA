import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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
  @Input()
  isSendByUser!: Function;
  message:string='';
  chatHistory:any;
  isCurrentUserSender(msg: any): boolean {
    return this.isSendByUser(msg);
  }
  sendMessage():void{
    if(this.message.trim()){
      this.messageSend.emit(this.message)
      this.message='';
    }
  }
    //sroll
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    ngAfterViewChecked() {
      this.scrollToBottom();
    }
  
    scrollToBottom(): void {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { 
        console.log(err);
      }
    }
}
