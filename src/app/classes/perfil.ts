import { Storage } from '@ionic/storage';
import { Usuario } from './usuario';

export class Perfil {
  public storage: Storage;
  public perfil: any;
  public cUsuario: Usuario;
  public usuarioLogado: any;

  constructor(public store: Storage) {
    this.storage = store;
    this.cUsuario = new Usuario(this.storage);
  }

  async getPerfil() {
    this.usuarioLogado = await this.cUsuario.getUsuario();

    const usuariosCadastrados: any =
      await this.cUsuario.getUsuariosCadastrados();

    this.perfil = usuariosCadastrados.filter(
      (item: any) => item.usuario === this.usuarioLogado.usuario
    )[0];

    return this.perfil;
  }
}
