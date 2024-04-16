import { ElementRef, Injectable, inject } from '@angular/core';
import { SocketService } from '../../../app/shared/data-access/global/socket.service';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private signalingService = inject(SocketService);
  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  connection!: RTCPeerConnection;

  private async _initConnection(remoteVideo: ElementRef): Promise<void> {
    console.log('...........remote video comes here .......');
    console.log(remoteVideo)
    this.connection = new RTCPeerConnection(this.configuration);
    console.log(`................connection`,this.connection)
    await this._getStreams(remoteVideo);
    this._registerConnectionListeners();
  }

  public async makeCall(remoteVideo: ElementRef): Promise<void> {
    await this._initConnection(remoteVideo);

    const offer = await this.connection.createOffer();

    console.log(offer);

    // todo send message to socket service type as offer
    this.signalingService.sendVideoMessages({ type: 'offer', offer });

    await this.connection.setLocalDescription(offer);
  }

  public async handleOffer(
    offer: RTCSessionDescription,
    remoteVideo: ElementRef
  ): Promise<void> {
    await this._initConnection(remoteVideo);
    await this.connection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const answer = await this.connection.createAnswer();
    console.log(answer);
    await this.connection.setLocalDescription(answer);
    //todo send a message to socket like type as answer
    this.signalingService.sendVideoMessages({ type: 'answer', answer });
  }

  public async handleAnswer(answer: RTCSessionDescription): Promise<void> {
    await this.connection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  }
  public async handleCandidate(candidate: RTCIceCandidate): Promise<void> {
    if (candidate) {
      console.log('Hello candidate');
      await this.connection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  private _registerConnectionListeners(): void {
    this.connection.onicegatheringstatechange = (ev: Event) => {
      console.log(
        `ICE gathering state changed: ${this.connection.iceGatheringState}`
      );
    };
    this.connection.onconnectionstatechange = () => {
      console.log(
        `connection state changed: ${this.connection.connectionState}`
      );
    };
    this.connection.onsignalingstatechange = () => {
      console.log(
        `Signaling  state changed: ${this.connection.signalingState}`
      );
    };
    this.connection.oniceconnectionstatechange = () => {
      console.log(
        `ICE connection state change: ${this.connection.iceConnectionState}`
      );
    };
    this.connection.onicecandidate = (event) => {
      if (event.candidate) {
        const payload = {
          type: 'candidate',
          candidate: event.candidate.toJSON(),
        };
        this.signalingService.sendVideoMessages(payload);
        //todo send a message with payload to socket service
      }
    };
  }

  private async _getStreams(remoteVideo: ElementRef): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    console.log('remoteStream', remoteStream);
    remoteVideo.nativeElement.srcObject = remoteStream;

    this.connection.ontrack = (event) => {
      console.log(event);
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    stream.getTracks().forEach((track) => {
      console.log(track);
      console.log('track');
      this.connection.addTrack(track, stream);
    });
  }
}
