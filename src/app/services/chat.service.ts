import { Injectable } from '@angular/core';

export class Message {
  constructor(public content: string, public sentBy: string, public createdAt: number) { }
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {

}
