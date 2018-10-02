import { Component,ViewChild, ElementRef } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public user: any;
  public marker:any;
  public lgds: any;
  public lgds2: any;
  public baseURI :string = "http://localhost:8080/ionicAPI/";
  public i:any=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.user=this.navParams.data;
    this.load();
  }
  //แสดงแผนที่ (ระดับ,พิกัด)
  load(){
    let   body     : string   = "key=selectlocation",
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
      }
    });
  }
  }


