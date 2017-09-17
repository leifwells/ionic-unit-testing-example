import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

Injectable()
export class Page3HttpProvider {

  constructor(
    public http: Http
  ){}

  get(page: number, limit: number = 25) {
    const urlStr: string = 'http://localhost:3004/items?_page=' + page + '&_limit=' + limit;

    return this.http.get(urlStr)
                    .map((resp) => resp = resp.json())
  }
}
