import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import Chart from 'chart.js/auto';
import { FuncoesGeraisService } from '../services/funcoes-gerais.service';
import { Movimento } from '../classes/movimento';
import { RequisicaoService } from '../services/requisicao.service';

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

  public movimentos: any[] = [];
  public cMovimento: Movimento;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    public funcoes: FuncoesGeraisService,
    private requisicao: RequisicaoService
  ) {
    this.cMovimento = new Movimento(requisicao);
  }

  ngOnInit(): void {}

  async ionViewWillEnter() {
    await this.storage.get('saldo').then((data) => {
      this.saldo = data;
      if (this.saldo > 0) this.cor = 'success';
      if (this.saldo < 0) this.cor = 'danger';
    });

    this.buscarMovimentos();
  }

  async buscarMovimentos() {
    let idConta = 1;

    this.cMovimento.getMovimentos(idConta).then((data: any) => {
      this.movimentos = data;
      console.log('buscou');
      this.atualizaGrafico();
      this.grafico.destroy();
    });
  }

  async atualizaGrafico() {
    const registrosRecebidos: any = this.movimentos.filter(
      (item: any) => item.tipo_movimento === 'RECEB.'
    );
    const registrosGastos: any = this.movimentos.filter(
      (item: any) => item.tipo_movimento === 'GASTO'
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

    if (item.tipo_movimento === 'GASTO') cor = 'danger';
    if (item.tipo_movimento === 'RECEB.') cor = 'success';

    return cor;
  }
}
