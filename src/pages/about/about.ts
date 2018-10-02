import { ProductdataPage } from './../productdata/productdata';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserPage } from '../user/user';
import { UserdataPage } from '../userdata/userdata';
import {App} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public user:any=[];

  constructor(public navCtrl: NavController,public app:App,public navParams:NavParams) {

  }
  ionViewWillEnter(){
    this.user=this.navParams.data;
  }
  userpro(){
    this.navCtrl.push(UserPage,this.user);
  }
  userdata(){
    this.navCtrl.push(UserdataPage,this.user);
  }
  productdata(){
    this.navCtrl.push(ProductdataPage,this.user);
  }
  logout(){
    this.app.getRootNav().setRoot(LoginPage);
  }

}
