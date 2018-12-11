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
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
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
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
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
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
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
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectperson.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.districtall = data;
    });
  }
update(boss_name,boss_tel,mem_no,mem_typeid,mem_name,mem_nickname,mem_birthday,mem_metier,mem_income,men_telhome,mem_mobile,mem_fax,mem_email,mem_line,men_fb,mem_twitter,mem_detail){
    let   body     : string   = "key=updateuser&boss_name="+boss_name+"&boss_tel="+boss_tel+"&mem_no="+mem_no+"&mem_typeid="+mem_typeid+"&mem_name="+mem_name+"&mem_nickname="+mem_nickname+"&mem_birthday="+mem_birthday+"&mem_metier="+mem_metier+"&mem_income="+mem_income+"&men_telhome="+men_telhome+"&mem_mobile="+mem_mobile+"&mem_fax="+mem_fax+"&mem_email="+mem_email+"&mem_line="+mem_line+"&men_fb="+men_fb+"&mem_twitter="+mem_twitter+"&mem_detail="+mem_detail+"&m_code="+ this.userCode,
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "addandupdate.php";
        this.http.post(url,body,options)
        .map(res => res.json())
        .subscribe(data => {
        alert(data);
        });
        this.navCtrl.pop(); 
      }
     
}