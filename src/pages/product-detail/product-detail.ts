import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  public items : any = [];
  public user : any;
  public  gds: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.items=this.navParams.data;
    this.user = this.navParams.data.m_code;
    this.gds = this.navParams.data.gds_id;
  }
  map(){
    this.navCtrl.push(MapPage,this.gds );
  }
  person(){
    this.navCtrl.push(UserPage ,this.user);
  }
  web(){
    window.open("http://esmce.nrru.ac.th/smce/",'_system', 'location=yes');
  }
}
