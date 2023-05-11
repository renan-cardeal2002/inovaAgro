import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public saldo: number = 0;
  public ocorrencias: any = [];
  public cor: string = 'warning';

  constructor(
    private navCtrl: NavController,
    private app: AppComponent,
    private storage: Storage
  ) {}

  ngOnInit(): void {}

  async ionViewWillEnter() {
    await this.storage.get('saldo').then((data) => {
      this.saldo = data;
      if (this.saldo > 0) this.cor = 'success';
      if (this.saldo < 0) this.cor = 'danger';
    });
    await this.storage.get('ocorrencias').then((data) => {
      if (data) this.ocorrencias = data;
    });
  }

  async irParaGastos() {
    this.navCtrl.navigateRoot('/tabs/gastos');
  }

  async irParaRecebimentos() {
    this.navCtrl.navigateRoot('/tabs/recebimentos');
  }

  async deslogar() {
    this.app.deslogar();
  }
}
