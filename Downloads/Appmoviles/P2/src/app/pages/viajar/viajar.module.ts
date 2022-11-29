import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajarPageRoutingModule } from './viajar-routing.module';

import { ViajarPage } from './viajar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViajarPage]
})
export class ViajarPageModule {}
