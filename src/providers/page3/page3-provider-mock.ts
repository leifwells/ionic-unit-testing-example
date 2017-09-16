import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page3Item } from './page3-item';
import { Page3ProviderInterface } from './page3-provider-interface';
import 'rxjs/add/operator/map';

@Injectable()
export class Page3ProviderMock implements Page3ProviderInterface  {
  limit: number = 25;
  page: number = 0;

  icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  'american-football', 'boat', 'bluetooth', 'build'];

  constructor() {}

  getItems(): Observable<Page3Item[]> {
    this.page++;

    return Observable.of(this.createItems());
  }

  getMoreItems(): Observable<Page3Item[]> {
    this.page++;

    return Observable.of(this.createItems());
  }

  private createItems(): Page3Item[] {
    let items = [];
    for (let i = 1; i <= this.limit; i++) {
      items.push({
        title: 'Item ' + (((this.page - 1) * this.limit) + i),
        note: 'This is item #' + (((this.page - 1) * this.limit) + i),
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    // for (let i = 1; i <= 1000; i++) {
    //   items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
    // console.log(JSON.parse(JSON.stringify(items)));
    // // DevTools > Console > Global Var
    // // copy(item1)

    return items;
  }

}
