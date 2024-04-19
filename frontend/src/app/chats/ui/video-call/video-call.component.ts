import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent {
  @Input() openVideoCall!: boolean;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  // @ViewChild('localVideo') localVideo!: ElementRef;
  @Output()remoteVideoRef:EventEmitter<ElementRef<any>>=new EventEmitter<ElementRef<any>>()
  closeModal() {
    this.openVideoCall = false;
  }
  ngAfterViewInit(): void {
    console.log(this.remoteVideo)
    this.remoteVideoRef.emit(this.remoteVideo)
  }
}
