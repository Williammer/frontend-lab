import { Component, OnInit } from '@angular/core';
import { Hero } from "../types/hero";
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Rx';
import { ReloadService } from '../reload.service';

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"]
})
export class HeroComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  idTimer: any;

  constructor(
    private heroService: HeroService,
    private reloadService: ReloadService
  ) {}

  ngOnInit() {
    this.syncHeroes();
    this.reloadService.requestLoad$
      .subscribe({ next: (value) => {
          console.warn("1. reload request received! value: ", value);
          // this.syncHeroes();
          this.clearIdTimer();
          this.reloadService.reloadComplete$.next("搞定！");
        } });
  }

  syncHeroes(): any {
    return this.heroService
      .getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.slice();
      });
  }
  onIdTimerClicked(): void {
    this.idTimer = Observable.timer(0, 1000)
      .subscribe(() => {
        this.heroes[0].id++;
      });
  }
  clearIdTimer(): void {
    if (this.idTimer) {
      this.idTimer.unsubscribe();
    }
  }
  onHeroClicked(hero: Hero): void {
    this.selectedHero = hero;
  }
}
