import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items : any = [];
  public user :any;
  public image_base64:any;
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public http:Http) {

  }
  ionViewWillEnter(){
    this.load();
  }
  load(){
    this.image_base64='assets/imgs/logo.png';
    this.http.get('http://esmce.nrru.ac.th/smce/mobile/selectnews.php')
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
  }
}