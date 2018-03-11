import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  messages: string[] = [];
  add(message: string){
    this.messages.push(message);
  };
  clear(){
    this.messages.length = 0;
  };
}
