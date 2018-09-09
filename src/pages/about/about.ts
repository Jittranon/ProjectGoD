import { ProductdataPage } from './../productdata/productdata';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { UserdataPage } from '../userdata/userdata';
import {App} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public app:App) {

  }
  user(){
    this.navCtrl.push(UserPage);
  }
  userdata(){
    this.navCtrl.push(UserdataPage);
  }
  productdata(){
    this.navCtrl.push(ProductdataPage);
  }
  logout(){
    this.app.getRootNav().setRoot(LoginPage);
  }

}
