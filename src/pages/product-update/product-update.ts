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
  public gda_porg:any;
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
  update(){
    alert(this.gds_name);
    alert(this.gds_detail);
    alert(this.gda_porg);
    alert(this.gds_price);
    let   body     : string   = "key=updateproduct&gds_name="+this.gds_name+"&gds_detail="+this.gds_detail+"&gda_porg="+this.gda_porg+"&gds_price="+this.gds_price+"&gds_id="+this.gds_id,
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
    this.navCtrl.pop();
  }
  
}
