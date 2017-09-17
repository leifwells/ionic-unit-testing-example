import { Inject, Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Page3Item } from './page3-item';
// import { Page3HttpProvider } from './page3-http-provider';
import 'rxjs/add/operator/map';

/*
USING json-server TO CREATE A REAL DATA SOURCE
https://github.com/typicode/json-server
$ npm install -g json-server
cd to the mock-data folder
$ json-server --watch data.json --port 3004 --delay 2000
--watch data.json WATCHES THE MOCK DATA FILE
--port 3004 SPECIFIES THE PORT
--delay 2000 DELAYS THE CALL BY 2 SECONDS
SEE THE DOCUMENTATION ON THE _page AND _limit URL PARAMETERS
*/

@Injectable()
export class Page3Provider {

  items: Page3Item[] = new Array();
  limit: number = 25;
  page: number = 0;

  constructor(
    @Inject('Page3HttpProvider') private page3HttpProvider
  ) {}

  getItems(): Observable<Page3Item[]> {
    if(this.items.length) {
      return Observable.of(this.items);
    } else {
      this.page++;

      return this.page3HttpProvider.get(this.page, this.limit)
                                  .map((resp) => {
                                    return this.items = this.items.concat(resp);
                                  });
    }
  }

  getMoreItems(): Observable<Page3Item[]> {
    this.page++;

    return this.page3HttpProvider.get(this.page, this.limit)
               .map((resp) => {
                 return this.items = this.items.concat(resp);
               });
  }

}
