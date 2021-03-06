import { Http, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ProductDetailPage } from '../product-detail/product-detail';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  public items : any = [];
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";
  public user: any;
  public searchd:any;
  public searchw:any;
  public type: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.load();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewWillEnter(){
    this.user=this.navParams.data;
    this.load();
    this.typeproduct();
  }
  typeproduct(){
    let   body     : string   = "key=selecttype",
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
    this.type = data;
  });
  }
  load(){
    let   body     : string   = "key=select",
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
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
    this.navCtrl.push(ProductDetailPage,item);
  }
  search(){
    this.loaddata();
  }
  loaddata(){
    let   body     : string   = "key=selectproduct&searchd="+this.searchd+"&searchw="+this.searchw,
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI +"selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
  }

}
