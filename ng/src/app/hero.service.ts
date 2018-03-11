import { Injectable } from '@angular/core';
import { HEROES } from "./api/mock-heros";
import { Hero } from './types/hero';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { MessagesService } from './messages.service';

@Injectable()
export class HeroService {
  constructor(private messagesService: MessagesService) { }

  getHeroes(): Observable<Hero[]> {
    this.messagesService.add("Fetched heros!");
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messagesService.add("Fetched hero: "+id);
    return of(HEROES.find(hero => hero.id === id));
  }
}
