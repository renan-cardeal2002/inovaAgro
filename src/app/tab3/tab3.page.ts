import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public perfil: any = {
    nome: 'Renan',
    cargo: 'Desenvolvedor',
    email: 'renan01022002@hotmail.com',
    telefone: '(43) 99867-2746',
  }; //this.storage.get('perfil');

  constructor(private storage: Storage) {}
}
