import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-user-data-update',
  templateUrl: 'user-data-update.html',
})
export class UserDataUpdatePage {
  public items : any =[];
  public userCode: any ;
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";
  public provinceall: any=[];
  public province:any;
  public amphurall: any;
  public districtall: any;
  public amphur: any;
  public district:any;
  public aa:any;
  public bb:any;
  public cc:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDataUpdatePage');
  }
  ionViewWillEnter(){
    this.userCode=this.navParams.data;
    this.load();
  }
  load1(pmt){
    this.loadamphur(pmt);
  }
  load2(pmt){
    this.loaddistrict(pmt);
  }
  load(){
    let   body     : string   = "key=select&userCode="+this.userCode,
          type     : string   = "application/x-www-form-urlencoded; charset=tis-620",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectperson.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
      let province=data[0].province_id;
      let amphur=data[0].amphur_id;
      this.loadprovince();
      this.loadamphur(province);
      this.loaddistrict(amphur);
    });
    
  }
  loadprovince(){
    let   body     : string   = "key=selectprovince",
          type     : string   = "application/x-www-form-urlencoded; charset=tis-620",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectperson.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.provinceall = data; 
    });
  }
  loadamphur(province){
    province =this.province;
    let   body     : string   = "key=selectamphur&province="+province,
          type     : string   = "application/x-www-form-urlencoded; charset=tis-620",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectperson.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.amphurall = data;
    });
  }
  loaddistrict(amphur){
    amphur = this.amphur;
    let   body     : string   = "key=selectdistrict&amphur="+amphur,
          type     : string   = "application/x-www-form-urlencoded; charset=tis-620",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectperson.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.districtall = data;
    });
  }
update(){
  alert(this.aa);
  alert(this.bb);
  alert(this.cc);
  this.navCtrl.pop();
}
}