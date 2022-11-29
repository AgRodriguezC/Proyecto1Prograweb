import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ClimaComponent } from 'src/app/services/clima/clima.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
],
  declarations: [
    ClimaComponent
],
  exports: [
    ClimaComponent,
    IonicModule
],
})
export class ServicesModule{}
