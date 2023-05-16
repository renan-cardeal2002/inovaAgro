import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  template: '',
})
export abstract class BasicModulos {
  private navCtrl: NavController;

  constructor() {}

  voltar() {
    this.navCtrl.back();
  }
}
