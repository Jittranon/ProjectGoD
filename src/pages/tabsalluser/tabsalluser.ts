import { ProductPage } from './../product/product';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'tabsalluser.html',
})
export class TabsalluserPage {

  constructor(public navCtrl: NavController,
    public NavParams:NavParams,
    public http:Http) {

  } 
  ionViewWillEnter(){

  }
 
  
  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ProductPage;
  

  
  
}
