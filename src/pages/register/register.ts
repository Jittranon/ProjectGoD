import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Http,Headers ,RequestOptions } from '../../../node_modules/@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public form :FormGroup;
  public usernew:any;
  public emailnew:any;
  public group_id:any;
  public emp_id:any;
  public password:any;
  public aa:any;
  public passwordA:any;
  public result:any;
  public baseURI :string = "http://localhost:8080/ionicAPI/";
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public fb :FormBuilder,
    public toastCtrl :ToastController) {
      this.form = fb.group({
        "usernew" : ["", Validators.required],
        "emailnew" : ["", Validators.required],
        "group_id" : ["", Validators.required],
        "password" : ["", Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(){
    if(this.usernew==null){
      alert("กรุณากรอกชื่อ");
    }else if(this.group_id==null){
      alert("กรุณาเลือกกลุ่ม");
    }else if(this.emailnew==null){
      alert("กรุณากรอกอีเมล์");
    }
    else if(this.password==null){
      alert("กรุณากรอกรหัส");
    }else if(this.password!=this.passwordA){
      alert("รหัสผ่านไม่ตรงกัน");
    }
    else if(this.aa!=true){
      alert("กรุณากดยอมรับ");
    }
    else{
      alert(this.group_id+" "+this.emailnew+" "+this.usernew+" "+this.password);
    }
    
    /*let   body     : string   = "key=register&usernew="+this.usernew+"&password="+this.password,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "login.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.result = data;
      console.log(this.result);
    if(this.result == 1 ){
      //this.navCtrl.push(LoginPage );
    }else{
      alert("ไม่สามารถใช้ชื่อนี้ได้");
      console.log(this.result);
    }
      
    });*/
    
    
    
  }

}
