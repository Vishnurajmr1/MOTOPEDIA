import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent {
@ViewChild('remoteVideo')remoteVideo!:ElementRef;
@ViewChild('localVideo')localVideo!:ElementRef;
}
