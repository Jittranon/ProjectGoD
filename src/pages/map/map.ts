import { Component,ViewChild, ElementRef } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public google :GoogleMaps) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((position) => {
         this.latlngnow = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         }).catch((error) => {
         console.log('Error getting location', error);
      });
    console.log('ionViewDidLoad MapPage');
    this.gds=this.navParams.data;
    console.log(this.gds);
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
    //this.geolocation.getCurrentPosition().then((position) => {
     // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat:15,lng:102},
        zoom:15,
        mapTypeid:'roadmap'
    });
  //});
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
        this.latlngnow = latLng;
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
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://esmce.nrru.ac.th/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
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
        this.latlngnow = latLng;
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
          let content = '<ion-card> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://esmce.nrru.ac.th/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
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
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: {lat:15,lng:102},
          zoom:9,
          mapTypeid:'roadmap'
      });
        for(var i = 0; i < this.lgds.length; i++ ){
          if(this.lgds[i].t_code==1){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });
          }else if (this.lgds[i].t_code==2){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
          }else if (this.lgds[i].t_code==3){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
          }else if (this.lgds[i].t_code==4){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
          }else if (this.lgds[i].t_code==5){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            });
          }else if (this.lgds[i].t_code==6){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
            });
          }else if (this.lgds[i].t_code==7){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
          }else if (this.lgds[i].t_code==8){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
          }else if (this.lgds[i].t_code==9){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
          }else if (this.lgds[i].t_code==10){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
          }else if (this.lgds[i].t_code==11){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            });
          }else if (this.lgds[i].t_code==12){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            });
          }else if (this.lgds[i].t_code==13){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            });
          }else if (this.lgds[i].t_code==14){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            });
          }else if (this.lgds[i].t_code==15){
            this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
            });
          }else{
            this.marker = new google.maps.Marker({
              position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
              map: this.map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
              });
          }
          
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


