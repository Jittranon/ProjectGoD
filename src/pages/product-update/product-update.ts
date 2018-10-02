import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-update',
  templateUrl: 'product-update.html',
})
export class ProductUpdatePage {
  public items : any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductUpdatePage');
    this.items=this.navParams.data;
  }
  update(){
    this.navCtrl.pop();
  }
  
}
