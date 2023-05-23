import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Movimento } from 'src/app/classes/movimento';
import { MensagemService } from 'src/app/services/mensagem.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';

@Component({
  selector: 'app-recebimentos',
  templateUrl: './recebimentos.page.html',
  styleUrls: ['./recebimentos.page.scss'],
})
export class RecebimentosPage implements OnInit {
  public usuarioLogado: any;
  public saldoTotal: number;
  public valorRecebido: number;
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
    if (!this.valorRecebido || !this.descricao) {
      this.mensagem.mostrarMensagem(
        'Atenção',
        'Preencha todos os campos para continuar'
      );
      return;
    }

    this.saldoTotal += this.valorRecebido;
    this.storage.set('saldo', this.saldoTotal);

    const novaOcor = {
      tipoMovimento: 'RECEB.',
      descricao: this.descricao,
      valor: Math.abs(this.valorRecebido),
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
