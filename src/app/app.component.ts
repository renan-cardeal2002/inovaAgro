import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MensagemService } from './services/mensagem.service';
import { RequisicaoService } from './services/requisicao.service';

interface Login {
  usuario: string;
  senha: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public logado: boolean = false;
  public cadastrar: boolean = false;

  public formCadastro: {
    nome: string;
    email: string;
    telefone: string;
    usuario: string;
    senha: string;
  } = {
    nome: '',
    email: '',
    telefone: '',
    usuario: '',
    senha: '',
  };
  public formLogin: Login = {
    usuario: '',
    senha: '',
  };
  public usuariosCadastrados: any;
  public cadUsuarios: Login[] = [
    { usuario: 'renan', senha: '123' },
    { usuario: 'lucas_hirose', senha: '123' },
    { usuario: 'paula', senha: '123' },
    { usuario: 'isadora', senha: '123' },
    { usuario: 'lucas', senha: '123' },
    { usuario: 'joaquim', senha: '123' },
  ];

  constructor(
    private storage: Storage,
    private mensagem: MensagemService,
    private requisicao: RequisicaoService
  ) {}

  ngOnInit() {
    this.verificarLogin();
  }

  async verificarLogin() {
    await this.storage.set('usuariosCadastrados', this.cadUsuarios);
    await this.storage.get('usarioLogado').then((data) => {
      if (data) this.logado = true;
    });
  }

  async logar() {
    const { usuario, senha } = this.formLogin;

    if (!usuario || !senha) {
      this.mensagem.mostrarMensagem(
        'Atenção',
        'Preencha todos os campos para continuar'
      );

      return;
    }

    const url = `/login?login=${usuario}&senha=${senha}`;

    this.requisicao.get(url).subscribe(
      (data: any) => {
        if (data.status === 'ok') {
          this.storage.set('usarioLogado', this.formLogin);
          this.logado = true;
        } else {
          this.mensagem.mostrarMensagem('Atenção', data.msg);
        }
      },
      (err) => {
        this.mensagem.mostrarMensagem(
          'Atenção',
          err.error.msg ?? 'Serviço instável. Tente novamente mais tarde!'
        );
      }
    );
  }

  async irParaCadastro() {
    this.cadastrar = true;
  }

  async salvarCadastro() {
    if (
      !this.formCadastro.nome ||
      !this.formCadastro.email ||
      !this.formCadastro.telefone ||
      !this.formCadastro.usuario ||
      !this.formCadastro.senha
    ) {
      return;
    }

    // await this.storage.get('usuariosCadastrados').then((data) => {
    //   this.usuariosCadastrados = data;
    // });

    // this.usuariosCadastrados.push(this.formCadastro);
    // this.storage.set('perfil', this.formCadastro);
    // this.storage.set('usuariosCadastrados', this.usuariosCadastrados);

    this.formLogin.usuario = this.formCadastro.usuario;
    this.formLogin.senha = this.formCadastro.senha;

    this.cadastrar = false;

    await this.logar();
  }

  async limparHistorico() {
    this.storage.remove('saldo');
    this.storage.remove('ocorrencias');
  }

  async deslogar() {
    this.storage.remove('usarioLogado');
    this.logado = false;
  }
}
