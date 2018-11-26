import { ProductUpdatePage } from '../product-update/product-update';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ProductAddPage } from '../product-add/product-add';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-productdata',
  templateUrl: 'productdata.html',
})
export class ProductdataPage {
  public items : any = [];
  public userCode: any;
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdataPage');
  }
  ionViewWillEnter(){
    this.userCode=this.navParams.data;
    this.load();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.load();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  load(){
    let   body     : string   = "key=selectproductperson&userCode="+this.userCode,
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
  viewDetail(item){
    this.navCtrl.push(ProductUpdatePage,item);
  }
  add(){
    this.navCtrl.push(ProductAddPage,this.userCode);
  }
  map(item){
    this.navCtrl.push(MapPage,item);
  }
  delete(item){
    let   body     : string   = "key=deleteproduct&gds_id="+item.gds_id,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "addandupdate.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      alert(data);
    });
    this.deletelocation(item)
  }
  deletelocation(item){
    let   body     : string   = "key=deleteproductlocation&gds_id="+item.gds_id,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "addandupdate.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      alert(data);
    });
  }
}
