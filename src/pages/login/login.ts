import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http,Headers,RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public form :FormGroup;
  public user:any;
  public password :any;
  public result:any;
  public baseURI :string = "http://localhost:8080/ionicAPI/";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams ,
              public http:Http,
              public fb :FormBuilder) {
                
                
        this.form = fb.group({
          "user" : ["", Validators.required],
          "pass" : ["", Validators.required]
        });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    let   body     : string   = "key=login&user="+this.user+"&password="+this.password,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "login.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.result = data;
    if(this.result == 1 ){
      this.navCtrl.push(TabsPage ,this.result);
    }else{
      alert("ชื่อผู้ใช้หรือรหัสผ่านผิด");
      this.navCtrl.setRoot(LoginPage );
    }
    });
    
    
    
  }
  loginAll(){
    this.navCtrl.push(TabsPage );
  }

}
