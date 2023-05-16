import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public validaFotoPerfil = (foto_perfil: any) => {
    return foto_perfil === '' || !foto_perfil;
  };
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
  public perfilSelecionado: any = {
    nome: 'Renan Cardeal',
    usuario: 'renan',
    cargo: 'Desenvolvedor',
    email: 'renan01022002@hotmail.com',
    telefone: '(43) 99867-2746',
    foto_perfil: './../../assets/foto_perfil.svg',
  };
  public usuarioLogado: any;

  constructor(
    private storage: Storage,
    private navCtlr: NavController,
    private app: AppComponent,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {}

  async ionViewWillEnter() {
    await this.storage.get('usarioLogado').then((data) => {
      this.usuarioLogado = data;
    });

    this.perfilSelecionado = this.usuariosCadastrados.filter(
      (item: any) => item.usuario === this.usuarioLogado.usuario
    )[0];
  }

  async limparHistorico() {
    this.app.limparHistorico();
    this.navCtlr.back();
  }

  async deslogar() {
    const alert = await this.alertController.create({
      subHeader: 'Deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Sair',
          role: 'confirm',
          handler: () => {
            this.app.deslogar();
          },
        },
      ],
    });
    await alert.present();
  }

  bucarFotoPerfil(foto_perfil: any) {
    if (this.validaFotoPerfil(foto_perfil)) return;
    return foto_perfil;
  }
}
