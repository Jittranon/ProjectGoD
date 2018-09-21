import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.user=this.navParams.data;
    this.initMap();
  }
  //แสดงแผนที่ (ระดับ,พิกัด)
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 9,
      center: {lat: 15, lng: 102}
    });
  }

}
