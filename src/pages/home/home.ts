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
  public user: any=[];

  constructor(public navCtrl: NavController,public navParams:NavParams,public http:Http) {

  }
  ionViewWillEnter(){
    //this.user=this.navParams.data;
    this.load();
  }
  load(){
    this.http.get('http://localhost:8080/ionicAPI/selectnews.php')
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
  }
}
