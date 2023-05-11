import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage';
import Chart from 'chart.js/auto';

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

    await this.atualizaGrafico();
  }

  async atualizaGrafico() {
    await this.storage.get('ocorrencias').then((data) => {
      if (data) this.ocorrencias = data;
    });

    const registrosRecebidos: any = this.ocorrencias.filter(
      (item: any) => item.tipo === 'RECEB.'
    );
    const registrosGastos: any = this.ocorrencias.filter(
      (item: any) => item.tipo === 'GASTO'
    );

    const somaRecebidos = registrosRecebidos.reduce(
      (total: number, item: any) => total + item['valor'],
      0
    );
    const somaGastos = registrosGastos.reduce(
      (total: number, item: any) => total + item['valor'],
      0
    );

    const item: any = document.getElementById('saldo');
    new Chart(item, {
      type: 'doughnut',
      data: {
        labels: ['RECEB.', 'GASTO'],
        datasets: [
          {
            label: 'Saldo',
            data: [somaRecebidos, somaGastos],
            backgroundColor: ['#2dd36f', '#eb445a'],
          },
        ],
      },
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
