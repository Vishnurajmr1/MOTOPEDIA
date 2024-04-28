import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { SocketService } from '../../../../app/shared/data-access/global/socket.service';
import { CallService } from '../../data-access/call.service';
import { IUserDetails } from 'src/app/shared/types/user.Interface';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';

@Component({
  selector: 'video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent {
  @Input() openVideoCall!: boolean;
  @Input() participantData:IUserDetails|undefined;
  @Input() currentUser!:ICurrentUser
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  @ViewChild('localVideo') localVideo!: ElementRef;
  @Output()close:EventEmitter<boolean>=new EventEmitter<boolean>;
  private signalService=inject(SocketService);
  private callService=inject(CallService)
  inCall: boolean = false;
  localVideoActive: boolean = false;
  closeModal() {
    this.callService.hangup()
    this.close.emit(false);
  }
  ngAfterViewInit(): void {
    this.callService.getVideoElements(this.remoteVideo,this.localVideo);
    // this.callService.requestMediaDevices()
  }
  startLocalVideo(){
    console.log('starting local stream');
    this.callService.startLocalVideo()
    this.localVideoActive=true;
  }
  pauseLocalVideo(){
    console.log('Pause local video');
    this.callService.pauseLocalVideo()
    this.localVideoActive=false;
  }
  enableAudio(){
    console.log('Enable audio call');
    this.callService.toggleMuteMic()
  }
  pauseLocalAudio(){
    console.log('pause local audio');
    this.callService.toggleMuteMic()

  }
  call(){
    console.log('make a video call to another socket event');
    this.callService.makeCall()
    this.inCall=true;
  }
  hangUp(){
    console.log('hangup video call');
    this.callService.hangup()
    this.inCall=false;
    this.close.emit(false)
  }
}
