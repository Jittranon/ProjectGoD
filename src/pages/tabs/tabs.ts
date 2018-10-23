import { AboutPage } from './../about/about';
import { ProductPage } from './../product/product';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  public user: any;
  constructor(public navCtrl: NavController,
    public NavParams:NavParams,
    public http:Http) {

  } 
  ionViewWillEnter(){
      this.user=this.NavParams.data;
  }
 
  
  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ProductPage;
  tab4Root = AboutPage;
  

  
  
}
