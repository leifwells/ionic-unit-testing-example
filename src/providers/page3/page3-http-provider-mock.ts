import { Injectable } from '@angular/core';
import { Page3Item } from './page3-item';
import { Observable } from 'rxjs';

Injectable()
export class Page3HttpProviderMock {

  icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  'american-football', 'boat', 'bluetooth', 'build'];

  constructor(){}

  get(page: number, limit: number = 25) {

    return Observable.of(this.createItems(page, limit));
  }

  private createItems(page, limit): Page3Item[] {
    let items = [];
    for (let i = 1; i <= limit; i++) {
      items.push({
        title: 'Item ' + (((page - 1) * limit) + i),
        note: 'This is item #' + (((page - 1) * limit) + i),
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    return items;
  }
}
