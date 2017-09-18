import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Page3Item } from './../../providers/page3/page3-item';
import { Page3Provider } from '../../providers/page3/page3-provider';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  dataSubscription: Subscription;
  icons: string[];
  items: Page3Item[];
  infiniteScrollEnabled: boolean = true;
  showLoading: boolean = true;
  showingAlert: boolean = false;

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public page3provider: Page3Provider
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(infiniteScroll?: any) {
    let provider;
    if(infiniteScroll) {
      provider = this.page3provider.getMoreItems();
    } else {
      provider = this.page3provider.getItems();
    }
    provider.subscribe(
      (items) => {
        this.showLoading = false;
        this.items = items;
        if(infiniteScroll){
          infiniteScroll.complete();
        }
      },
      (err) => {
        this.items = [];
        this.presentErrorAlert(err.message);
        if(infiniteScroll){
          infiniteScroll.complete();
        }
      });
  }

  doInfinite(infiniteScroll) {
    this.loadData(infiniteScroll);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(Page2, {
    //   item: item
    // });
  }

  presentErrorAlert(message: string) {
    if(!this.showingAlert) {
      this.showingAlert = true;
      this.alertController.create({
        title: 'Error',
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.showLoading = false;
              console.log('cancel');
            }
          },
          {
            text: 'Retry',
            handler: () => {
              this.showLoading = false;
              this.loadData();
            }
          }
        ]
      }).present();
    }
  }

  // unsubscribe() {
  //   this.showLoading = false;
  //   this.dataSubscription.unsubscribe();
  // }
}
