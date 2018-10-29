import { Component,ViewChild, ElementRef } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public gds: any;
  public marker:any;
  public lgds: any;
  public lgds2: any;
  public baseURI :string = "http://localhost:80/ionicAPI/";
  public i:any=0;
  public items: any;
  public searchd:any;
  public searchw:any;
  public type: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.gds=this.navParams.data;
    console.log(this.gds);
    this. typeproduct();
    if(this.gds<1){
       this.loadall();
    }else{
      this.load();
    }
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
  loaddata(searchd){
    let   body     : string   = "key=selectproductlocation&searchd="+searchd,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.lgds = data;
      console.log(this.lgds);
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        alert(latLng);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: latLng,
          zoom:8,
          mapTypeid:'roadmap'
      });
        for(var i = 0; i < this.lgds.length; i++ ){
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map
          });
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://localhost:80/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
          this.addInfoWindow(this.marker, content,this.lgds[i]);
        }
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    });
  }
  
  //แสดงแผนที่ (ระดับ,พิกัด)
  load(){
    let   body     : string   = "key=selectlocation&gds="+this.gds,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.lgds = data;
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: latLng,
          zoom:8,
          mapTypeid:'roadmap'
      });
        for(var i = 0; i < this.lgds.length; i++ ){
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map
          });
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://localhost:80/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
          this.addInfoWindow(this.marker, content,this.lgds[i]);
        }
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    });
  }
  loadall(){
    let   body     : string   = "key=selectlocationall",
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "selectproduct.php";
    this.http.post(url,body,options)
    .map(res => res.json())
    .subscribe(data => {
      this.lgds = data;
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: latLng,
          zoom:9,
          mapTypeid:'roadmap'
      });
        for(var i = 0; i < this.lgds.length; i++ ){
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map
          });
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://localhost:80/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
          this.addInfoWindow(this.marker, content,this.lgds[i]);
        }
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    });
  }
  addInfoWindow(marker, content,lgds) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });
      //infoWindow.open(this.map, marker);
      google.maps.event.addListener(marker, 'click', () =>{
        infoWindow.open(this.map, marker);
        //this.navCtrl.push(ProductDetailPage,lgds);
      })
  }
}


