import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  public usuarioLogado: any;
  public saldoTotal: number;
  public valorGasto: number;
  public descricao: string = '';
  public ocorrencias: any[] = [];

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private mensagem: MensagemService
  ) {}

  async ngOnInit() {
    await this.storage.get('usarioLogado').then((data) => {
      if (data) this.usuarioLogado = data;
    });
    await this.storage.get('saldo').then((data) => {
      this.saldoTotal = data;
    });
    await this.storage.get('ocorrencias').then((data) => {
      if (data) this.ocorrencias = data;
    });
  }

  confirmar() {
    if (!this.valorGasto || !this.descricao) {
      this.mensagem.mostrarMensagem(
        'Atenção',
        'Preencha todos os campos para continuar'
      );
      return;
    }

    this.saldoTotal -= this.valorGasto;
    this.storage.set('saldo', this.saldoTotal);

    const novaOcor = {
      tipo: 'GASTO',
      usuario: this.usuarioLogado.usuario,
      valor: Math.abs(this.valorGasto),
      descricao: this.descricao,
      data: new Date(),
    };

    this.ocorrencias.push(novaOcor);

    // this.cOcorrencia.setOcorrencias(this.cOcorrencia.ocorrencias);
    this.storage.set('ocorrencias', this.ocorrencias);
    this.navCtrl.back();
  }

  voltar() {
    this.navCtrl.back();
  }
}
