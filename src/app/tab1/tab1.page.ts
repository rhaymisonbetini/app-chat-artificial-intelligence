import { Component, ViewChild,  OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from '../services/chat.service';
import { scan } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
 
  @ViewChild(IonContent, { static: false }) coontent: IonContent;
  messages: Observable<Message[]>;
  conversation = new BehaviorSubject<Message[]>([]);
  readonly token = environment.dialogFlow.angularBoot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  current = 'Capitu';
  newMsg = '';

  constructor(public chat: ChatService) {
  }

  ngOnInit(): void {
    this.messages = this.conversation.asObservable()
    .pipe(
      scan((acc, val) => acc.concat(val))
    );
  }

  sendMessage() {
    this.converse(this.newMsg);
    this.newMsg = '';
    setTimeout(() => {
      this.coontent.scrollToBottom(500);
    });
  }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user', new Date().getTime());
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        console.log(speech);
        const botMessage = new Message(speech, 'Capitu', new Date().getTime());
        this.update(botMessage);
      });
  }

  update(msg: Message) {
    this.conversation.next([msg]);
    setTimeout(() => {
      this.coontent.scrollToBottom(500);
    });
  }



}
