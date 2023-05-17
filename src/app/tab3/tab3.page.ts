import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Perfil } from '../classes/perfil';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public validaFotoPerfil = (foto_perfil: any) => {
    return foto_perfil === '' || !foto_perfil;
  };

  public perfilSelecionado: any = {
    nome: 'Renan Cardeal',
    usuario: 'renan',
    cargo: 'Desenvolvedor',
    email: 'renan01022002@hotmail.com',
    telefone: '(43) 99867-2746',
    foto_perfil: './../../assets/foto_perfil.svg',
  };

  public cPerfil: Perfil;

  constructor(
    private storage: Storage,
    private navCtlr: NavController,
    private app: AppComponent,
    private alertController: AlertController
  ) {
    this.cPerfil = new Perfil(storage);
  }

  ngOnInit(): void {}

  async ionViewWillEnter() {
    this.perfilSelecionado = await this.cPerfil.getPerfil();
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
