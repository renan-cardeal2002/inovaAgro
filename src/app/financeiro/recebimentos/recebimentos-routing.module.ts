import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecebimentosPage } from './recebimentos.page';

const routes: Routes = [
  {
    path: '',
    component: RecebimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecebimentosPageRoutingModule {}
