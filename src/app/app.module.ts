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
import { RegisterPage } from '../pages/register/register';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { UserdataPage } from '../pages/userdata/userdata';
import { UserPage } from '../pages/user/user';
import { ProductdataPage } from '../pages/productdata/productdata';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    MapPage,
    ProductPage,
    LoginPage,
    RegisterPage,
    ProductDetailPage,
    UserdataPage,
    UserPage,
    ProductdataPage
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
    RegisterPage,
    ProductDetailPage,
    UserdataPage,
    UserPage,
    ProductdataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
