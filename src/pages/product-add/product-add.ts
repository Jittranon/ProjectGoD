import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage {
  public baseURI :string = "http://localhost:80/ionicAPI/";
  public gds_name:any;
  public gds_detail:any;
  public gda_porg:any;
  public gds_price:any;
  public image_base64:any;
  public image_base64u: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public camera:Camera) {
  }

  ionViewDidLoad() {
    this.image_base64='assets/imgs/logo.png';
    console.log('ionViewDidLoad ProductAddPage');
  }
  update(gds_name,gds_detail,gda_prob,gds_price){
    /*alert(gds_name);
    alert(gds_detail);
    alert(gda_prob);
    alert(gds_price);*/
    let   body     : string   = "key=addproduct&gds_name="+gds_name+"&gds_detail="+gds_detail+"&gds_prob="+gda_prob+"&gds_price="+gds_price,
          type     : string   = "application/x-www-form-urlencoded; charset=utf-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "addandupdate.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      alert(data);
    });
    alert("ll");
    this.navCtrl.pop();
  }
  map(){
    this.navCtrl.push(MapPage,-1);
  }
  opencamera(){
    const options: CameraOptions = {
      targetHeight: 1000,
      targetWidth: 1000,
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image_base64 =imageData;
    this.image_base64u =imageData;
    //this.image_base64 =base64Image;
   }, (err) => {
     alert("error");
    // Handle error
   });
  }
  updatepic(){
    var packData = {
      image_base64:this.image_base64u
    }
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    let body = packData;
    this.http.post('http://localhost:80/ionicAPI/uploadimg.php',body,options);

  }
  
}
