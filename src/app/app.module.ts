import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { ProductPage } from '../pages/product/product';
import { LoginPage } from '../pages/login/login';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { UserdataPage } from '../pages/userdata/userdata';
import { UserPage } from '../pages/user/user';
import { ProductdataPage } from '../pages/productdata/productdata';
import { UserUpdatePage } from '../pages/user-update/user-update';
import { UserDataUpdatePage } from '../pages/user-data-update/user-data-update';
import { ProductUpdatePage } from '../pages/product-update/product-update';
import { TabsalluserPage } from '../pages/tabsalluser/tabsalluser';
import { ProductAddPage } from '../pages/product-add/product-add';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { VideoPlayer } from '@ionic-native/video-player';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MapPage,
    ProductPage,
    LoginPage,
    ProductDetailPage,
    UserdataPage,
    UserPage,
    ProductdataPage,
    UserUpdatePage,
    UserDataUpdatePage,
    ProductUpdatePage,
    TabsalluserPage,
    ProductAddPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false,
      autoFocusAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MapPage,
    ProductPage,
    LoginPage,
    ProductDetailPage,
    UserdataPage,
    UserPage,
    ProductdataPage,
    UserUpdatePage,
    UserDataUpdatePage,
    ProductUpdatePage,
    TabsalluserPage,
    ProductAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
