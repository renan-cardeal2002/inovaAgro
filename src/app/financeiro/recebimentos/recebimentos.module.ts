import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecebimentosPageRoutingModule } from './recebimentos-routing.module';

import { RecebimentosPage } from './recebimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecebimentosPageRoutingModule
  ],
  declarations: [RecebimentosPage]
})
export class RecebimentosPageModule {}
