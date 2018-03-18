import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReloadService {
  requestLoad$ = new Subject<any>();
  reloadComplete$ = new Subject<any>();

  constructor() {}
}
