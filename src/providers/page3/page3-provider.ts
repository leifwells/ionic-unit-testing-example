import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Page3Item } from './page3-item';
import { Page3ProviderInterface } from './page3-provider-interface'
import 'rxjs/add/operator/map';

@Injectable()
export class Page3Provider implements Page3ProviderInterface {

  limit: number = 25;
  page: number = 0;

  constructor(
    public http: Http
  ) {}

  getItems(): Observable<Page3Item[]> {
    this.page++;
    return this.http.get('http://localhost:3004/items?_page=' + this.page + '&_limit=' + this.limit)
                    .map((resp) => resp = resp.json());
  }

  getMoreItems(): Observable<Page3Item[]> {
    this.page++;
    return this.http.get('http://localhost:3004/items?_page=' + this.page + '&_limit=' + this.limit)
                    .map((resp) => resp = resp.json());
  }

}
