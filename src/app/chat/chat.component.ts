import { Component, OnInit, OnDestroy } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { Message } from '../models/message';
import { WebSocketMessage } from '../models/webSocketMessage';
import { ConnectionMessage } from '../models/connectionMessage';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private display: boolean;

  private webSocketConnectionError :string;
  private subscription: any;
  private personalSubscription: any;
  private clientRequestArraySubscription: any;
  private messages: Message[];
  private clientChatRequests: ConnectionMessage[];
  private messageForm: FormGroup;
  private dialog_id: string;
  private operator_name: string;
  private customer_id: string;


  constructor(private stomp: StompService, private fb: FormBuilder) {
  
    this.webSocketConnectionError = 'щось пішло не так, спробуйте ще раз або зверніться в службу підтримки';
    this.messages = [];
    this.clientChatRequests = [];
    this.operator_name  = sessionStorage.getItem('currentChatUserName'); 
  }

printSmth(){
  alert("adu e");
}
  ngOnInit() {
    
    this.stomp.configure({
      host: 'http://127.0.0.1:8082/chat/chat-websocket',
      debug: true,
      queue: { 'init': false, 'chat': false }
    });

    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      this.stomp.after('init').then(() => {
        this.subscription = this.stomp.subscribe('/topic/allChat', (data) => this.addNewClientRequestToChat(data));
        //removes dialogs that was already activated
        this.clientRequestArraySubscription = this.stomp.subscribe('/topic/checkClientRequestArray', (elem) => {
          
          this.clientChatRequests = this.clientChatRequests.filter((message: ConnectionMessage) => { message.getId != elem })
        })
      }).catch(() => alert(this.webSocketConnectionError));
    });
    
    this.createEmptyForm()
  }

  ngOnDestroy() {

    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.clientRequestArraySubscription != null) {
      this.clientRequestArraySubscription.unsubscribe();
      this.clientRequestArraySubscription = null;
    }
    if (this.personalSubscription != null) {
      this.personalSubscription.unsubscribe();
      this.personalSubscription = null;
    }
    this.stomp.disconnect().then(() => { })
  }

  startChat(customer_id: string, dialog_id: string) {
    
    this.stomp.after('init').then(() => {
      //unsubscribes operator from topics before starting chat
      this.subscription.unsubscribe();
      this.clientRequestArraySubscription.unsubscribe();
      this.clientChatRequests = [];

      //notifies other operators about activation of the dialog
      this.stomp.send('/chat/checkClientRequestArray', { 'customerId': customer_id });
    });
    this.stomp.done('chat');
    this.customer_id = customer_id;
    this.dialog_id = dialog_id;
    this.stomp.after('chat').then(() => {
      //adds the ability to recieve personal messages
      this.subscribeToOperatorPersonalChanel();
      //sends 'pre-flight' connection message with info about operator to the client
      this.sendConnectionMessageToClient();
      this.display = true;
    }).catch(() => alert(this.webSocketConnectionError));
  }

  subscribeToOperatorPersonalChanel() {
   
    this.personalSubscription = this.stomp.subscribe('/queue/' + this.operator_name, response => this.handleCustomerMessage(response))
  }

  sendConnectionMessageToClient() {

    this.stomp.send('/chat/connection/' + this.customer_id, new ConnectionMessage(this.operator_name, this.dialog_id))
  }

  endChat() {
   
   this.customer_id = null;
    this.dialog_id = null;
    this.display = false;
    this.stomp.after('init').then(() => {
      this.subscription = this.stomp.subscribe('/topic/allChat', (data) => this.addNewClientRequestToChat(data));
      this.clientRequestArraySubscription = this.stomp.subscribe('/topic/checkClientRequestArray', (elem) => {
        console.log(elem); this.clientChatRequests = this.clientChatRequests.filter((message: ConnectionMessage) => { message.getId != elem })
      })
    }).catch(() => alert(this.webSocketConnectionError));
  }

  handleCustomerMessage(response: any) {

    let responseMessage = response as WebSocketMessage;
    this.messages.push(new Message(responseMessage.getText(), this.customer_id, false));
  }

  addNewClientRequestToChat(data) {
    
    this.clientChatRequests.push(data as ConnectionMessage);
  }

  sendMessage() {
    //for testing
    // this.customer_id="test";
    this.messages.push(new Message(this.messageForm.value.text, this.operator_name, true));
    this.stomp.send('/chat/client/' + this.customer_id, new WebSocketMessage(this.messageForm.value.text, this.dialog_id));
    this.messageForm.reset();
  }

  createEmptyForm() {

    this.messageForm = this.fb.group({
      text: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    })
  }



}
