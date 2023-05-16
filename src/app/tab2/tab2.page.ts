import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public aplicativos: { idAplicativo: string; nome: string; rota: string }[] = [
    {
      idAplicativo: 'RECEBIMENTOS',
      nome: 'Recebimentos',
      rota: '/tabs/recebimentos',
    },
    { idAplicativo: 'GASTOS', nome: 'Gastos', rota: '/tabs/gastos' },
    // {
    //   idAplicativo: 'RECEBIMENTOS-FIXOS',
    //   nome: 'Recebimentos Fixos',
    //   rota: '',
    // },
    // { idAplicativo: 'GASTOS-FIXOS', nome: 'Gastos Fixos', rota: '' },
    // {
    //   idAplicativo: 'PREVISAO-RECEBIMENTOS',
    //   nome: 'Previsão de recebimentos',
    //   rota: '',
    // },
    // { idAplicativo: 'PREVISAO-GASTOS', nome: 'Previsão de gastos', rota: '' },
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {}

  async ionViewWillEnter() {}

  getCorCard(item: any) {
    let cor: string = 'warning';

    if (item.idAplicativo === 'GASTOS') cor = 'danger';
    if (item.idAplicativo === 'RECEBIMENTOS') cor = 'success';

    return cor;
  }

  selecionarApp(item: any) {
    if (item.rota !== '' && item.rota) this.navCtrl.navigateRoot(item.rota);
  }
}
