import { Storage } from '@ionic/storage';

export class Usuario {
  public storage: Storage;
  private usuario: any;
  private usuariosCadastrados: any = [
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

  constructor(public store: Storage) {
    this.storage = store;
  }

  async getUsuario() {
    return await this.storage.get('usarioLogado');
  }

  async setUsuario(param: any) {
    this.storage.set('usarioLogado', param);
  }

  async getUsuariosCadastrados() {
    return this.usuariosCadastrados;
  }
}
