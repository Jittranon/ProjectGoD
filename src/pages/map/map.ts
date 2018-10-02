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
  public baseURI :string = "http://localhost:8080/ionicAPI/";
  public i:any=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.user=this.navParams.data;
    this.load();
    this.initMap();
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
      console.log(this.lgds);

    });
    /*this.lgds=[
      [14,102],
      [15,103],
      [16,104],
      [16,105]
    ];*/
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
				center: {lat:14.9,lng: 102.08},
				zoom:10,
				mapTypeid:'roadmap'
    });
    /*for (this.i = 0; this.i < this.lgds.length; this.i++) {
			this.marker = new google.maps.Marker({
				position: new google.maps.LatLng(this.lgds[this.i][0], this.lgds[this.i][1]),
				map: this.map
			});
		}*/
  }

}
