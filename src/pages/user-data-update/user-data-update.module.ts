import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDataUpdatePage } from './user-data-update';

@NgModule({
  declarations: [
    UserDataUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserDataUpdatePage),
  ],
})
export class UserDataUpdatePageModule {}
