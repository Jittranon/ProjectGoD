import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
@IonicPage()
@Component({
  selector: 'page-product-update',
  templateUrl: 'product-update.html',
})
export class ProductUpdatePage {
  public items : any = [];
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";
  public gds_name:any ;
  public gds_detail:any;
  public gda_prob:any;
  public gds_price:number;
  public gds_id:number;
  public codeitem: any;
  public myphoto1: string;
  public myphoto2: string;
  public myphoto3: string;
  public myphoto4: string;
  public myphotoname1: string;
  public myphotoname2: string;
  public myphotoname3: string;
  public myphotoname4: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http,
              private transfer: FileTransfer,
              public camera:Camera) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductUpdatePage');
    this.codeitem=this.navParams.data.gds_id;
    this.loaddata();
    this.myphoto1 = "http://esmce.nrru.ac.th/smce/upload/"+this.items.gds_pic1+""
    this.myphoto2 = "http://esmce.nrru.ac.th/smce/upload/"+this.items.gds_pic2+""
    this.myphoto3 = "http://esmce.nrru.ac.th/smce/upload/"+this.items.gds_pic3+""
    this.myphoto4 = "http://esmce.nrru.ac.th/smce/upload/"+this.items.gds_pic4+""
  }
  loaddata(){
    let   body     : string   = "key=selectproductperson1&codeitem="+this.codeitem,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.items = data;
    });
        
  }
  update(gds_id,gds_name,gds_detail,gds_prob,gds_price){
    this.uploadImage();
    
    let   body     : string   = "key=updateproduct&gds_name="+gds_name+"&gds_detail="+gds_detail+"&gds_prob="+gds_prob+"&gds_price="+gds_price+"&gds_id="+gds_id+"&pic1="+this.myphotoname1+"&pic2="+this.myphotoname2+"&pic3="+this.myphotoname3+"&pic4="+this.myphotoname4,
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
    this.uploadImage1(this.myphoto1);
    this.uploadImage2(this.myphoto2);
    this.uploadImage3(this.myphoto3);
    this.uploadImage4(this.myphoto4);
  }
  uploadImage1(myphoto){
    //Show loading
    /*let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();*/

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "Image_" + Date.now() + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    //alert(options.fileName);
    this.myphotoname1 = options.fileName;


    //file transfer action
    fileTransfer.upload(myphoto, 'http://esmce.nrru.ac.th/smce/uploadPhoto.php', options)
    .then((data) => {
      //alert("อัพโหลดภาพที่ 1 สำเร็จ");
      //loader.dismiss();
    }, (err) => {
      console.log(err);
      alert("อัพโหลดภาพที่ 1 ไม่สำเร็จ");
      //loader.dismiss();
    });
  }
  uploadImage2(myphoto){
    //Show loading
    /*let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();*/

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "Image_" + Date.now() + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    //alert(options.fileName);
    this.myphotoname2 = options.fileName;


    //file transfer action
    fileTransfer.upload(myphoto, 'http://esmce.nrru.ac.th/smce/uploadPhoto.php', options)
      .then((data) => {
        //alert("อัพโหลดภาพที่ 2 สำเร็จ");
        //loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("อัพโหลดภาพที่ 2 ไม่สำเร็จ");
        //loader.dismiss();
      });
  }
  uploadImage3(myphoto){
    //Show loading
    /*let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();*/

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "Image_" + Date.now() + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    //alert(options.fileName);
    this.myphotoname3 = options.fileName;


    //file transfer action
    fileTransfer.upload(myphoto, 'http://esmce.nrru.ac.th/smce/uploadPhoto.php', options)
      .then((data) => {
        //alert("อัพโหลดภาพที่ 3 สำเร็จ");
        //loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("อัพโหลดภาพที่ 3 ไม่สำเร็จ");
        //loader.dismiss();
      });
  }
  uploadImage4(myphoto){
    //Show loading
    /*let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();*/

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "Image_" + Date.now() + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    //alert(options.fileName);
    this.myphotoname4 = options.fileName;


    //file transfer action
    fileTransfer.upload(myphoto, 'http://esmce.nrru.ac.th/smce/uploadPhoto.php', options)
      .then((data) => {
        //alert("อัพโหลดภาพที่ 4 สำเร็จ");
        //loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("อัพโหลดภาพที่ 4 ไม่สำเร็จ");
        //loader.dismiss();
      });
  }
  
}
