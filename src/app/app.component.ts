import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public logado: boolean = false;
  public formLogin: { usuario: string; senha: string } = {
    usuario: '',
    senha: '',
  };
  public usuariosCadastrados: any;
  public cadUsuarios = [{ usuario: 'renan', senha: '123' }];

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.verificarLogin();
  }

  async verificarLogin() {
    await this.storage.set('usuariosCadastrados', this.cadUsuarios);
    await this.storage.get('usarioLogado').then((data) => {
      if (data) {
        this.logado = true;
      }
    });
  }

  async logar() {
    if (!this.formLogin.usuario || !this.formLogin.senha) {
      return;
    }

    await this.storage.get('usuariosCadastrados').then((data) => {
      this.usuariosCadastrados = data;
    });

    if (!this.usuariosCadastrados.length) {
      return;
    }

    this.usuariosCadastrados.forEach((element: any) => {
      if (
        this.formLogin.usuario == element.usuario &&
        this.formLogin.senha == element.senha
      ) {
        this.storage.set('usarioLogado', this.formLogin);
        this.logado = true;
      }
    });
  }
  async deslogar() {
    this.storage.remove('usarioLogado');
    this.logado = false;
  }
}
