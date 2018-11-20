import { Component,ViewChild, ElementRef } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { Geolocation } from '@ionic-native/geolocation';
import { UserPage } from '../user/user';
import { GoogleMaps } from '@ionic-native/google-maps';

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
  public baseURI :string = "http://esmce.nrru.ac.th/smce/mobile/";
  public i:any=0;
  public items: any;
  public searchd:any;
  public searchw:any;
  public type: any;
  public gdsid :any;
  public personid :any;
  public latlngnow :any;
  public latlng :any;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http,
              public geolocation: Geolocation,
              public google :GoogleMaps,
              public platform :Platform) {
  }

  ionViewDidLoad() {
    var options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0
    };

   
     this.geolocation.getCurrentPosition(options).then((position) => {
         this.latlngnow = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         }).catch((error) => {
         console.log('Error getting location', error);
         alert('kkkkk '+error.code+' '+error.message);
      });
    console.log('ionViewDidLoad MapPage');
    this.gds=this.navParams.data;
    this. typeproduct();
    if(this.gds<1 &&this.gds >-1){
      this.loadall();
    }else if(this.gds<0){
      this.addlocation();
    }else{
      this.load();
    }
  }
  addlocation(){
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat:15,lng:102},
        zoom:15,
        mapTypeid:'roadmap'
    });
    google.maps.event.addListener(this.map, 'click',function(my){
      alert(my.lat+''+my.lng);
    })
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
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: this.latlngnow,
          zoom:15,
          mapTypeid:'roadmap'
      });
        for(var i = 0; i < this.lgds.length; i++ ){
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://esmce.nrru.ac.th/smce/mobile/color/'+this.lgds[i].color_img
          });
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://esmce.nrru.ac.th/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
          this.addInfoWindow(this.marker, content,this.lgds[i]);
        }
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
      let latlngproduct = new google.maps.LatLng(data[0].lgds_lat,data[0].lgds_lng);
        this.map = new google.maps.Map(this.mapElement.nativeElement, { 
          center: latlngproduct,
          zoom:15,
          mapTypeid:'roadmap'
      });
        for(var i = 0; i < this.lgds.length; i++ ){
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://esmce.nrru.ac.th/smce/mobile/color/'+this.lgds[i].color_img
          });
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://esmce.nrru.ac.th/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
          this.addInfoWindow(this.marker, content,this.lgds[i]);
        }
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
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: this.latlngnow,
          zoom:15,
          mapTypeid:'roadmap'
      });
      
        for(var i = 0; i < this.lgds.length; i++ ){
          
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://esmce.nrru.ac.th/smce/mobile/color/'+this.lgds[i].color_img
          });
          let content = '<ion-card><ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://esmce.nrru.ac.th/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
      
       this.addInfoWindow(this.marker, content,this.lgds[i]);
        }
    });
  }
  addInfoWindow(marker, content,lgds) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });
      //infoWindow.open(this.map, marker);
      google.maps.event.addListener(marker, 'click', () =>{
        infoWindow.open(this.map, marker);
        this.gdsid = lgds;
        this.personid = lgds.m_code;
        this.latlng = new google.maps.LatLng(lgds.lgds_lat, lgds.lgds_lng);
      })
  }
  route(){
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);

      directionsService.route({
          origin: this.latlngnow,
          destination: this.latlng,
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {

          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
          } else {
              console.warn(status);
          }

      });
  }
  person(){
    this.navCtrl.push(UserPage ,this.personid);
  }
  goods(){
    this.navCtrl.push(ProductDetailPage ,this.gdsid);
  }
}


