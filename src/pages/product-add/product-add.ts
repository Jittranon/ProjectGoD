import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapPage } from '../map/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@IonicPage()
@Component({
  selector: 'page-product-add',
  templateUrl: 'product-add.html',
})
export class ProductAddPage {
  public baseURI :string = "http://192.168.0.112/ionicAPI/";
  public gds_name:any;
  public gds_detail:any;
  public gda_porg:any;
  public gds_price:any;
  public type: any;
  public myphoto1: string;
  public myphoto2: string;
  public myphoto3: string;
  public myphoto4: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public camera:Camera, 
              private transfer: FileTransfer, 
              private file: File) {
  }

  ionViewDidLoad() {
    this.myphoto1='assets/imgs/logo.png';
    this.myphoto2='assets/imgs/logo.png';
    this.myphoto3='assets/imgs/logo.png';
    this.myphoto4='assets/imgs/logo.png';
    this.typeproduct();
    console.log('ionViewDidLoad ProductAddPage');
  }
  update(gds_name,gds_detail,gda_prob,gds_price){
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
    this.navCtrl.pop();
  }
  map(){
    this.navCtrl.push(MapPage,-1);
  }
  typeproduct(){
    let   body     : string   = "key=selecttype",
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
    this.type = data;
  });
  }
  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:2551,
      targetHeight:1701
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto1 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  takePhoto1(){
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:2551,
      targetHeight:1701
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto1 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  takePhoto2(){
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:2551,
      targetHeight:1701
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  takePhoto3(){
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:2551,
      targetHeight:1701
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto3 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  takePhoto4(){
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth:2551,
      targetHeight:1701
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto4 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  uploadImage(){
    this.uploadImageall(this.myphoto1);
    this.uploadImageall(this.myphoto2);
    this.uploadImageall(this.myphoto3);
    this.uploadImageall(this.myphoto4);
  }
  uploadImageall(myphoto){
    //Show loading
    /*let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();*/

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 1000);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "Image_" + Date.now() + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    alert(options.fileName);

    //file transfer action
    fileTransfer.upload(myphoto, 'http://192.168.0.112/ionicAPI/uploadPhoto.php', options)
      .then((data) => {
        alert("Success");
        //loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("Error");
        //loader.dismiss();
      });
  }
  
}
