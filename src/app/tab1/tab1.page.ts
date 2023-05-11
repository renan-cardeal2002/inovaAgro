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
    let registrosRecebidos: any = [];
    let registrosGastos: any = [];

    this.ocorrencias.forEach((item: any) => {
      if (item.tipo === 'RECEB.') {
        registrosRecebidos.push(item);
      } else if (item.tipo === 'GASTO') {
        registrosGastos.push(item);
      }
    });

    const somaRecebidos = registrosRecebidos.reduce(
      (total: number, item: any) => total + item['valor'],
      0
    );
    const somaGastos = registrosGastos.reduce(
      (total: number, item: any) => total + item['valor'],
      0
    );

    console.log(somaRecebidos, somaGastos);

    let item: any = document.getElementById('saldo');
    new Chart(item, {
      type: 'doughnut',
      data: {
        labels: ['RECEB.', 'GASTO'],
        datasets: [
          {
            label: 'Saldo',
            data: [somaRecebidos, somaGastos],
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
