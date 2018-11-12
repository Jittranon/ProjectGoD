import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-product-update',
  templateUrl: 'product-update.html',
})
export class ProductUpdatePage {
  public items : any = [];
  public baseURI :string = "http://192.168.0.112/ionicAPI/";
  public gds_name:any ;
  public gds_detail:any;
  public gda_prob:any;
  public gds_price:number;
  public gds_id:number;
  public codeitem: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductUpdatePage');
    this.codeitem=this.navParams.data.gds_id;
    this.loaddata();
  }
  loaddata(){
    let   body     : string   = "key=selectproductperson1&codeitem="+this.codeitem,
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
  update(gds_id,gds_name,gds_detail,gds_prob,gds_price){
    alert(gds_name);
    alert(gds_detail);
    alert(gds_prob);
    alert(gds_price);
    /*let   body     : string   = "key=updateproduct&gds_name="+gds_name+"&gds_detail="+gds_detail+"&gds_prob="+gds_prob+"&gds_price="+gds_price+"&gds_id="+gds_id,
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "addandupdate.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
    alert(data);
  });
    this.navCtrl.pop();*/
  }
  
}
