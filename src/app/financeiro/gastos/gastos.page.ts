import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Movimento } from 'src/app/classes/movimento';
import { RequisicaoService } from 'src/app/services/requisicao.service';
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
  public cMovimento: Movimento;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private mensagem: MensagemService,
    private requisicao: RequisicaoService
  ) {
    this.cMovimento = new Movimento(requisicao);
  }

  async ngOnInit() {
    await this.storage.get('usarioLogado').then((data) => {
      if (data) this.usuarioLogado = data;
    });
    await this.storage.get('saldo').then((data) => {
      this.saldoTotal = data;
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
      tipoMovimento: 'GASTO',
      descricao: this.descricao,
      valor: Math.abs(this.valorGasto),
      data: new Date(),
      usuario: this.usuarioLogado.usuario,
      conta: 1,
    };

    this.cMovimento.inserirMovimento(novaOcor);
    this.navCtrl.back();
  }

  voltar() {
    this.navCtrl.back();
  }
}
