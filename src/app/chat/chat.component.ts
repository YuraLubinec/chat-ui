import { Component, OnInit, OnDestroy } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  private subscription: any;

  constructor(private stomp: StompService) {
    stomp.configure({
      host: 'http://127.0.0.1:8082/chat/chat-websocket',
      debug: true,
      queue: { 'init': false }
    });
    console.log("try to connect");
    console.log(stomp.config.host);
    stomp.startConnect().then(() => {
      stomp.done('init');
      console.log('connected');

      // subscribe 
      this.subscription = stomp.subscribe('/topic/allChat', this.response);

      // send data 
      // stomp.send('/chat/connect', { "data": "data" });

    });

  }

  public response = (data) => {
    console.log(data)
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // disconnect
    this.stomp.disconnect().then(() => {
      console.log('Connection closed')
    })
  }

}
