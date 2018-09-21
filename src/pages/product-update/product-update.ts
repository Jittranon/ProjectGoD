import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-product-update',
  templateUrl: 'product-update.html',
})
export class ProductUpdatePage {
  public items : any = [];
   public userCode: any;
   public baseURI :string = "http://localhost:8080/ionicAPI/";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductUpdatePage');
  }
  ionViewWillEnter(){
    this.userCode=this.navParams.data;
    console.log(this.userCode);
    this.load();
  }
  load(){
    let   body     : string   = "key=selectperson&userCode="+this.userCode,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
  }
  update(){
    this.navCtrl.pop();
  }
}
