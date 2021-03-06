import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  combineLatest,
  distinctUntilKeyChanged,
  filter,
  fromEvent,
  groupBy,
  map,
  merge,
  mergeAll,
  Observable,
  shareReplay,
} from 'rxjs';

import { KeyCode } from './keycodes';

@Injectable()
export class KeyboardService {
  private readonly keydown$ = fromEvent<KeyboardEvent>(this.document, 'keydown');
  private readonly keyup$ = fromEvent<KeyboardEvent>(this.document, 'keyup');

  private readonly keyEventsGroups$ = merge(this.keydown$, this.keyup$).pipe(
    groupBy((event) => event.code),
    shareReplay(),
  )

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  shortcut(shortcut: KeyCode[] | KeyCode): Observable<KeyboardEvent[]> {
    return Array.isArray(shortcut)
      ? combineLatest(
        shortcut.map((keyCode) => this.createKeyPressStream(keyCode))
      ).pipe(
        filter<KeyboardEvent[]>((arr) => arr.every((a) => a.type === 'keydown')),
      )
      : this.createKeyPressStream(shortcut).pipe(
        filter((a) => a.type === 'keydown'),
        map((a) => [a]),
      )
  }

  createKeyPressStream(keyCode: KeyCode) {
    return this.keyEventsGroups$.pipe(
      filter((group) => group.key === keyCode),
      mergeAll(),
      distinctUntilKeyChanged('type'),
    );
  }
}
