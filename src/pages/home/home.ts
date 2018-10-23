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
  public user :any;
  public image_base64:any;
  public baseURI :string = "http://localhost:80/ionicAPI/";
  public image_base64u: any;

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
    this.http.get('http://localhost:80/ionicAPI/selectnews.php')
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
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
  web(){
    window.open("http://google.com",'_system', 'location=yes');
  }
}