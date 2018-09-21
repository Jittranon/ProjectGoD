import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserUpdatePage } from './user-update';

@NgModule({
  declarations: [
    UserUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserUpdatePage),
  ],
})
export class UserUpdatePageModule {}
