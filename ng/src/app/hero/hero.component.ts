import { Component, OnInit } from '@angular/core';
import { Hero } from "../types/hero";
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { interval } from "rxjs/observable/interval";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"]
})
export class HeroComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  idTimer: any;

  constructor(private heroService: HeroService) {}
  ngOnInit() {
    this.syncHeroes();
  }

  syncHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
  onIdTimerClicked(): void {
    this.idTimer = interval(1000).subscribe(() => {
      this.heroes[0].id++;
    });
  }
  clearIdTimer(): void {
    this.idTimer.unsubscribe();
  }
  onHeroClicked(hero: Hero): void {
    this.selectedHero = hero;
  }
}
