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
  public baseURI :string = "http://localhost:80/ionicAPI/";
  public gds_name:any;
  public gds_detail:any;
  public gda_prob:any;
  public gds_price:any;
  public gds_id:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductUpdatePage');
    this.items=this.navParams.data;
  }
  update(gds_id,gds_name,gds_detail,gda_prob,gds_price){
    /*alert(gds_name);
    alert(gds_detail);
    alert(gda_prob);
    alert(gds_price);*/
    let   body     : string   = "key=updateproduct&gds_name="+gds_name+"&gds_detail="+gds_detail+"&gda_prob="+gda_prob+"&gds_price="+gds_price+"&gds_id="+gds_id,
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "addandupdate.php";
    this.http.post(url,body,options)
    alert("ll");
    //this.navCtrl.pop();
  }
  
}
