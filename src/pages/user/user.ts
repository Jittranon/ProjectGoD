import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductDetailPage } from '../product-detail/product-detail';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public items : any = [];
  public itemdata : any = [];
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";
  public userCode: any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.userCode=this.navParams.data;
    console.log(this.userCode)
  }
  ionViewWillEnter(){
    this.load();
    this.loaddata();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.load();
    this.loaddata();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  load(){
    let   body     : string   = "key=select&userCode="+this.userCode,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectperson.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
  }
  loaddata(){
    let   body     : string   = "key=selectproductperson&userCode="+this.userCode,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.itemdata = data;
    });
  }
  viewDetail(itemdata){
    this.navCtrl.push(ProductDetailPage,itemdata);
  }
}
