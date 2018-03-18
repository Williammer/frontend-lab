import { Component, OnInit } from '@angular/core';
import { ReloadService } from '../reload.service';
import { Observable } from "rxjs/Rx";

@Component({
  selector: "drag-to-load",
  templateUrl: "./drag-to-load.component.html",
  styleUrls: ["./drag-to-load.component.css"]
})
export class DragToLoadComponent implements OnInit {
  _startY: number;
  loaderPosY: string;

  constructor(private reloadService: ReloadService) {
  }

  ngOnInit() {
    const start$ = Observable.fromEvent(document, "mousedown");
    const move$ = Observable.fromEvent(document, "mousemove");
    const end$ = Observable.fromEvent(document, "mouseup");

    const drag$ = start$
      .switchMap(({ pageY: startPageY }) => {
        this._onMouseDown(startPageY);

        return move$.throttleTime(30).map(({ pageY: movePageY }) => {
          return movePageY - startPageY;
        });
      })
      .do(this._onMouseMoved.bind(this))
      .takeUntil(end$)
      .repeat(-1)
      .subscribe();

    // how to append this to drag$?
    end$.subscribe(this._onMouseUp.bind(this));
  }

  _onMouseDown(pageY) {
    this._startY = pageY;
  }
  _onMouseMoved(pageY) {
    this._moveLoader(pageY);
  }
  _moveLoader(y) {
    this.loaderPosY = y + "px";
  }
  _onMouseUp({pageY}) {
    if (pageY - this._startY > 300) {
      Observable.timer(2000).subscribe(() => {
        this.reloadService.reloadComplete$.subscribe({
          next: value => {
            this.loaderPosY = "-60px";
            console.warn("2. reload complete! value: ", value);
          }
        });
        this.reloadService.requestLoad$.next("走起！");
      });
    } else {
      this.loaderPosY = "-60px";
    }
  }
}
