import { AboutPage } from './../about/about';
import { ProductPage } from './../product/product';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ProductPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
