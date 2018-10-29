import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage {
  public gds_name:any;
  public gds_detail:any;
  public gda_porg:any;
  public gds_price:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductAddPage');
  }
  update(){
    alert(this.gds_name);
    alert(this.gds_detail);
    alert(this.gda_porg);
    alert(this.gds_price);
    this.navCtrl.pop();
  }
}
