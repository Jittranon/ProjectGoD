import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductdataPage } from './productdata';

@NgModule({
  declarations: [
    ProductdataPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductdataPage),
  ],
})
export class ProductdataPageModule {}
