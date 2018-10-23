import { Component,ViewChild, ElementRef } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
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

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat:this.lgds[0].lgds_lat,lng: this.lgds[0].lgds_lng},
        zoom:10,
        mapTypeid:'roadmap'
    });

    for(var i = 0; i < this.lgds.length; i++ ){
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
        map: this.map
      });
        let content = '<ion-card (click)=viewDetail()> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://localhost:80/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
        this.addInfoWindow(this.marker, content);
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

        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: {lat:this.lgds[0].lgds_lat,lng: this.lgds[0].lgds_lng},
            zoom:10,
            mapTypeid:'roadmap'
        });

      for(var i = 0; i < this.lgds.length; i++ ){
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
          map: this.map
        });
        let content = '<ion-card (click)=viewDetail()> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://localhost:80/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
        this.addInfoWindow(this.marker, content);
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
            center: {lat:this.lgds[0].lgds_lat,lng: this.lgds[0].lgds_lng},
            zoom:10,
            mapTypeid:'roadmap'
        });

      for(var i = 0; i < this.lgds.length; i++ ){
        this.marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.lgds[i].lgds_lat, this.lgds[i].lgds_lng),
          map: this.map
        });
        let content = '<ion-card (click)=viewDetail()> <ion-card-title hidden ><b>'+  this.lgds[i].gds_name +' </b></ion-card-title><img src="http://localhost:80/smce/upload/'+this.lgds[i].gds_pic1 +'"/>';
        this.addInfoWindow(this.marker, content);
      }
    });
  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });
      infoWindow.open(this.map, marker)
      google.maps.event.addListener(marker, 'click', () =>{
        infoWindow.open(this.map, marker)
      })
  }
  viewDetail(){
    this.navCtrl.push(ProductDetailPage);
  }
  }


