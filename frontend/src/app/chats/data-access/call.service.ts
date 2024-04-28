import { ElementRef, Injectable, inject } from '@angular/core';
import { SocketService } from '../../../app/shared/data-access/global/socket.service';

// const mediaConstraints = {
//   audio: true,
//   video: {width: 1280, height: 720}
//   // video: {width: 1280, height: 720} // 16:9
//   // video: {width: 960, height: 540}  // 16:9
//   // video: {width: 640, height: 480}  //  4:3
//   // video: {width: 160, height: 120}  //  4:3
// };
const mediaConstraints={
  audio:true,
  video:true
}
const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};
@Injectable({
  providedIn: 'root',
})
export class CallService {
  private signalingService = inject(SocketService);
  private localStream!: MediaStream;
  remoteVideo!: ElementRef;
  localVideo!:ElementRef;
  chatId!:string;
  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  connection!: RTCPeerConnection;

  private async _initConnection(): Promise<void> {
    console.log('...........initConnection video comes here .......');
    this.connection = new RTCPeerConnection(this.configuration);
    console.log(`................connection`, this.connection);
    // await this._getStreams(remoteVideo);
    this._registerConnectionListeners();
  }

  public async makeCall(): Promise<void> {
    console.log('here the starting call happening in the make call ')
    await this._initConnection();
    this.localStream.getTracks().forEach(
      track=>this.connection.addTrack(track,this.localStream)
    )
    try{
      const offer = await this.connection.createOffer(offerOptions);
      console.log(offer);
      await this.connection.setLocalDescription(offer);
        // todo send message to socket service type as offer
    this.signalingService.sendVideoMessage({ type: 'offer', data:offer });
    }catch(err:any){
      this.handleGetUserMediaError(err)
    }
  }
  public async hangup(){
    this.signalingService.sendVideoMessage({type:'hangup',data:''})
    this.closeVideoCall()
  }

  public async handleOffer(
    offer: RTCSessionDescription,
  ): Promise<void> {
    console.log('handle incoming offer✅✅✅✅✅✅🚀')
    if(!this.connection){
      this._initConnection();
    }
    if(!this.localStream){
      this.startLocalVideo()
    }
    await this.connection.setRemoteDescription(
      new RTCSessionDescription(offer)
    )
    this.localVideo.nativeElement.srcObject=this.localStream;
      this.localStream.getTracks().forEach(track=>{
        console.log('here comes the offer call stream track');
        this.connection.addTrack(track,this.localStream)})

    const answer = await this.connection.createAnswer();
    console.log(answer);
    await this.connection.setLocalDescription(answer);
    //todo send a message to socket like type as answer
    this.signalingService.sendVideoMessage({ type: 'answer', data:this.connection.localDescription });
  }

  public async handleAnswer(answer: RTCSessionDescription): Promise<void> {
    console.log('incoming answer');
    await this.connection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }
  public async handleCandidate(candidate: RTCIceCandidate): Promise<void> {
    try {
      if (candidate) {
        console.log('Hello candidate');
        console.log(candidate)
        await this.connection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  public async handleHangupMessage(message:any):Promise<void>{
    console.log(message);
    this.closeVideoCall()
  }
  public async getVideoElements(remoteVideo:ElementRef,localVideo:ElementRef){
    this.localVideo=localVideo;
    this.remoteVideo=remoteVideo;
    console.log(localVideo,remoteVideo)
  }
  public async requestMediaDevices():Promise<void>{
    try {
      this.localStream=await navigator.mediaDevices.getUserMedia(mediaConstraints);
      console.log(this.localStream)
      this.pauseLocalVideo()
      this.toggleMuteMic()
      // this.pauseLocalAudio()
    } catch (error:any) {
      console.log(error);
      alert('getUserMedia() error'+error)
    }
  }
  pauseLocalVideo():void{
    console.log('pause local stream');
    this.localStream.getVideoTracks().forEach(track=>{
      console.log(track)
      track.enabled=false})
      if(this.localVideo){
        this.localVideo.nativeElement.srcObject=undefined;
      }
  }
  pauseLocalAudio():void{
    console.log('pause local audio');
    this.localStream.getAudioTracks().forEach(track=>{
      track.enabled=false;
    })
  }
  toggleMuteMic():void{
    console.log('Mute my mic');
    this.localStream.getAudioTracks().forEach(track=>{
      console.log(track,'track happening opposite')
      track.enabled=!track.enabled
    })
  }
  startLocalVideo():void{
    console.log('starting local stream');
      console.log('local stream in startLocalVideo')
      this.localStream.getTracks().forEach(track=>track.enabled=true);
      if(this.localVideo!==undefined){
        this.localVideo.nativeElement.srcObject=this.localStream;
      }
  }

  private _registerConnectionListeners(): void {
    this.connection.onicecandidate = this.handleIceCandidateEvent;
    this.connection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
    this.connection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    this.connection.ontrack=this.handleTrackEvent;

    this.connection.onicegatheringstatechange = (event: Event) => {
      console.log(event);
      console.log(
        `ICE gathering state changed: ${this.connection.iceGatheringState}`
      );
    };
    this.connection.onconnectionstatechange = () => {
      console.log(
        `connection state changed: ${this.connection.connectionState}`
      );
    };
  }
  private closeVideoCall():void{
    console.log('Closing Video Call');
    if(this.connection){
      console.log('--> Closing the peer connection');
      this.connection.ontrack=null;
      this.connection.onicecandidate=null;
      this.connection.oniceconnectionstatechange=null;
      this.connection.onsignalingstatechange=null;
      // Stop all transceivers on the connection
      this.connection.getTransceivers().forEach(transceiver=>{
        console.log(transceiver)
        if(transceiver.direction!=='inactive'){
          transceiver.stop()
        }
      })
      this.connection.close();
      this.connection=undefined as any;
      // make inCall to false
      if(this.localStream){
        this.localStream.getTracks().forEach(track=>{
          track.stop()
        })
        this.localStream=undefined as any;
      }
    }
  }

  // Error handling for video call permission
  private handleGetUserMediaError(e:Error):void{
    console.log('error in media stream',e)
    switch(e.name){
      case 'NotFoundError':
        alert('Unable to open your call no camer or microphone found');
      break;
      case 'SecurityError':
      case 'PermissionDenied':
      break;
      default:
        console.log(e);
      alert('Error opening your camera or microphone'+e.message);
      break;   
    }
    this.closeVideoCall()
  }
  // private reportError = (e: Error) => {
  //   console.log('got Error: ' + e.name);
  //   console.log(e);
  // }

  // private async _getStreams(remoteVideo: ElementRef): Promise<void> {
  //   console.log(remoteVideo);
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true,
  //   });
  //   console.log(stream);
  //   const remoteStream = new MediaStream();
  //   console.log('remoteStream', remoteStream);
  //   remoteVideo.nativeElement.srcObject = stream;

  //   this.connection.ontrack = (event) => {
  //     console.log(event);
  //     event.streams[0].getTracks().forEach((track) => {
  //       remoteStream.addTrack(track);
  //     });
  //   };
  //   stream.getTracks().forEach((track) => {
  //     console.log(track);
  //     console.log('track');
  //     this.connection.addTrack(track, stream);
  //   });
  // }

  /* #######################Event Handler #########################3 */
  private handleIceCandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log('-----------iceCandidate event-----------');
    console.log(event);
    console.log('event');
    if (event.candidate) {
      const payload = {
        type: 'candidate',
        data: event.candidate,
      };
      console.log('payload happening');
      console.log(payload);
      this.signalingService.sendVideoMessage(payload);
      //todo send a message with payload to socket service
    }
  };
  private handleICEConnectionStateChangeEvent = (event: Event) => {
    console.log(
      `ICE connection state change: ${this.connection.iceConnectionState}`
    );
    console.log('=====handleICEConnectionStateChangeEvent===');
    console.log(event);
    console.log('=====handleICEConnectionStateChangeEvent===');
    switch (this.connection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.closeVideoCall()
        break;
    }
  };
  private handleSignalingStateChangeEvent = (event: Event) => {
    console.log('handleSignalingStateChangeEventevent');
    console.log(
      `Signaling  state changed: ${this.connection.signalingState}`
    );
    console.log(event);
    console.log('handleSignalingStateChangeEventevent');
    switch (this.connection.signalingState) {
      case 'closed':
        this.closeVideoCall()
        break;
    }
  };
  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log('Track Event');
    this.remoteVideo.nativeElement.srcObject = event.streams[0];
  };
}
