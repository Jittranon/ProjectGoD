import { Http, RequestOptions,Headers } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items : any = [];
  public image_base64:any;

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public http:Http,
               public camera:Camera) {

  }
  ionViewWillEnter(){
    this.load();
  }
  load(){
    this.image_base64='assets/imgs/logo.png';
    this.http.get('http://localhost:8080/ionicAPI/selectnews.php')
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
  }
  opencamera(){
    const options: CameraOptions = {
      targetHeight: 50,
      targetWidth: 50,
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image_base64 =base64Image;
   }, (err) => {
    // Handle error
   });
  }
  updatepic(){
    var packData = {
      image_base64:this.image_base64
    }
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    let body = packData;
    this.http.post('http://localhost:8080/ionicAPI/uploadimg.php',body,options);

  }
}