import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recebimentos',
  templateUrl: './recebimentos.page.html',
  styleUrls: ['./recebimentos.page.scss'],
})
export class RecebimentosPage implements OnInit {
  public saldoTotal: number = 0;
  public valorRecebido: number = 0;
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
    if (!this.valorRecebido || !this.descricao) return;

    this.saldoTotal += this.valorRecebido;
    this.storage.set('saldo', this.saldoTotal);

    const novaOcor = {
      tipo: 'RECEB.',
      valor: this.valorRecebido,
      descricao: this.descricao,
    };

    this.ocorrencias.push(novaOcor);

    this.storage.set('ocorrencias', this.ocorrencias);

    this.navCtrl.back();
  }
}
