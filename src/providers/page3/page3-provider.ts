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

const errorMessage: string = `There has been an error!
                              Did you remember to start the json-server?`;

@Injectable()
export class Page3Provider {

  items: Page3Item[] = new Array();
  limit: number = 25;
  page: number = 0;



  constructor(
    @Inject('Page3HttpProvider') private page3HttpProvider
  ) {}

  getItems(): Observable<Page3Item[]> {
    return new Observable(observer => {
      if(this.items.length) {
        observer.next(this.items);
        return observer.complete();
      } else {
        this.page++;

        return this.page3HttpProvider
                    .get(this.page, this.limit)
                    .subscribe(
                      (resp) => {
                        this.items = this.items.concat(resp);
                        observer.next(this.items);
                        observer.complete();
                      },
                      (err) => {
                        this.page = 0;
                        this.items = [];
                        observer.error({ message: errorMessage});
                      });
      }
    });
  }

  getMoreItems(): Observable<Page3Item[]> {
    this.page++;

    return new Observable(observer => {
      return this.page3HttpProvider
                  .get(this.page, this.limit)
                  .subscribe(
                    (resp) => {
                      this.items = this.items.concat(resp);
                      observer.next(this.items);
                      observer.complete();
                    },
                    (err) => {
                      this.page = 0;
                      this.items = [];
                      observer.error({ message: errorMessage});
                    });
      });
  }

}
