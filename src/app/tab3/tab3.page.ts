import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public usuariosCadastrados: any = [
    {
      nome: 'Renan Cardeal',
      usuario: 'renan',
      cargo: 'Desenvolvedor',
      email: 'renan01022002@hotmail.com',
      telefone: '(43) 99867-2746',
      foto_perfil: './../../assets/foto_perfil.svg',
    },
    {
      nome: 'Lucas Hirose',
      usuario: 'lucas_hirose',
      cargo: 'Jogador',
      email: '',
      telefone: '',
      foto_perfil: '',
    },
    {
      nome: 'Paula Andrea Cardeal',
      usuario: 'paula',
      cargo: 'Professora',
      email: 'paula_andrea1503@hotmail.com',
      telefone: '(43) 99953-0246',
      foto_perfil: '',
    },
    {
      nome: 'Joaquim Ribeiro Neto',
      usuario: 'joaquim',
      cargo: 'Engenheiro/Empresário',
      email: 'joaquim@flsoft.com.br',
      telefone: '(43) 99931-8136',
      foto_perfil: '',
    },
    {
      nome: 'Isadora Cardeal',
      usuario: 'isadora',
      cargo: 'Estudante',
      email: '',
      telefone: '',
      foto_perfil: '',
    },
    {
      nome: 'Lucas Cardeal',
      usuario: 'lucas',
      cargo: 'Estudante',
      email: '',
      telefone: '',
      foto_perfil: '',
    },
  ];

  public perfilSelecionado: any;
  public usuarioLogado: any;

  constructor(
    private storage: Storage,
    private navCtlr: NavController,
    private app: AppComponent
  ) {}

  ngOnInit(): void {}

  async ionViewWillEnter() {
    await this.storage.get('usarioLogado').then((data) => {
      this.usuarioLogado = data;
    });

    // await this.storage.get('perfil').then((data) => {
    //   if (data) this.perfil = data;
    //   // if (data.usuario === this.usuarioLogado.usuario) this.perfil = data;
    // });

    this.perfilSelecionado = this.usuarioLogado.filter({
      usuario: this.usuarioLogado.usuario,
    })[0];

    console.log(this.perfilSelecionado);
  }

  async limparHistorico() {
    this.app.limparHistorico();
    this.navCtlr.pop();
  }

  async deslogar() {
    this.app.deslogar();
  }
}
