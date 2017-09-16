import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page3Item } from './../../providers/page3/page3-item';
import { Page3Provider } from '../../providers/page3/page3-provider';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  icons: string[];
  items: Page3Item[];
  infiniteScrollEnabled: true;

  constructor(
    public navCtrl: NavController,
    public page3provider: Page3Provider
  ) {}

  ngOnInit() {
    this.page3provider.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  doInfinite(infiniteScroll) {
    this.page3provider.getMoreItems().subscribe((items) => {
      this.items = items;
      infiniteScroll.complete();
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(Page2, {
    //   item: item
    // });
  }
}
