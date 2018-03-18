import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './messages.service';
import { AppRouterModule } from './/app-router.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragToLoadComponent } from './drag-to-load/drag-to-load.component';
import { ReloadService } from './reload.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DragToLoadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule
  ],
  providers: [HeroService, MessagesService, ReloadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
