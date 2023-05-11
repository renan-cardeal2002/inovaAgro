import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  public saldoTotal: number = 0;
  public valorGasto: number = 0;
  public descricao: string = '';
  public ocorrencias: any[] = [];

  constructor(private navCtrl: NavController, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.get('saldo').then((data) => {
      this.saldoTotal = data;
    });
    await this.storage.get('ocorrencias').then((data) => {
      if (data) this.ocorrencias = data;
    });
  }

  confirmar() {
    if (!this.valorGasto || !this.descricao) return;

    this.saldoTotal -= this.valorGasto;
    this.storage.set('saldo', this.saldoTotal);

    const novaOcor = {
      tipo: 'GASTO',
      valor: this.valorGasto,
      descricao: this.descricao,
    };

    this.ocorrencias.push(novaOcor);

    this.storage.set('ocorrencias', this.ocorrencias);
    this.navCtrl.back();
  }
}
