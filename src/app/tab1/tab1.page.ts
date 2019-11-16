import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  current = 'capitu';
  @ViewChild(IonContent, { static: false }) coontent: IonContent;

  constructor() {
  }


  messages = [
    {
      user: 'capitu',
      createdAt: new Date().getTime(),
      msg: 'Ola!'
    },
    {
      user: 'root',
      createdAt: new Date().getTime(),
      msg: 'Tesde de edição'
    }
  ];

  newMsg = '';

  sendMessage() {
    this.messages.push({
      user: 'simon',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });
    this.newMsg = '';
    this.coontent.scrollToBottom(1000);
  }

}
