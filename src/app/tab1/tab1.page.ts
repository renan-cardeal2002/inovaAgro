import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import Chart from 'chart.js/auto';
import { FuncoesGeraisService } from '../services/funcoes-gerais.service';
import { Ocorrencias } from '../classes/ocorrencias';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public saldo: number = 0;
  public cor: string = 'warning';
  public grafico: any;
  public visualizaSaldo: boolean = false;

  public cOcorrencia: Ocorrencias;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    public funcoes: FuncoesGeraisService
  ) {
    this.cOcorrencia = new Ocorrencias(this.storage);
  }

  ngOnInit(): void {}

  async ionViewWillEnter() {
    await this.storage.get('saldo').then((data) => {
      this.saldo = data;
      if (this.saldo > 0) this.cor = 'success';
      if (this.saldo < 0) this.cor = 'danger';
    });

    await this.cOcorrencia.getOcorrencias().then(() => {
      this.atualizaGrafico();
      this.grafico.destroy();
    });
  }

  async atualizaGrafico() {
    const registrosRecebidos: any = this.cOcorrencia.ocorrencias.filter(
      (item: any) => item.tipo === 'RECEB.'
    );
    const registrosGastos: any = this.cOcorrencia.ocorrencias.filter(
      (item: any) => item.tipo === 'GASTO'
    );

    const somaRecebidos = await registrosRecebidos.reduce(
      (total: number, item: any) => total + item['valor'],
      0
    );
    const somaGastos = await registrosGastos.reduce(
      (total: number, item: any) => total + item['valor'],
      0
    );

    const item: any = document.getElementById('saldo');
    this.grafico = new Chart(item, {
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

  async verSaldo() {
    this.visualizaSaldo = !this.visualizaSaldo;
  }

  async irParaGastos() {
    this.navCtrl.navigateRoot('/tabs/gastos');
  }

  async irParaRecebimentos() {
    this.navCtrl.navigateRoot('/tabs/recebimentos');
  }

  getCorCard(item: any) {
    let cor: string = 'warning';

    if (item.tipo === 'GASTO') cor = 'danger';
    if (item.tipo === 'RECEB.') cor = 'success';

    return cor;
  }
}
