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
  public perfil: any = {
    nome: 'Renan',
    cargo: 'Desenvolvedor',
    email: 'renan01022002@hotmail.com',
    telefone: '(43) 99867-2746',
    foto_perfil: './../../assets/foto_perfil.svg',
  }; //this.storage.get('perfil');

  constructor(
    private storage: Storage,
    private navCtlr: NavController,
    private app: AppComponent
  ) {}

  ngOnInit(): void {}

  async ionViewWillEnter() {
    await this.storage.get('perfil').then((data) => {
      if (data) {
        this.perfil = data;
      }
    });
  }

  async limparHistorico() {
    this.app.limparHistorico();
    this.navCtlr.pop();
  }

  async deslogar() {
    this.app.deslogar();
  }
}
