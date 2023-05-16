import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  async mostrarMensagem(
    title: string = 'Atenção',
    message: string,
    buttons?: any
  ) {
    const alert = await this.alertController.create({
      cssClass: 'alerta',
      header: title,
      message: message,
      buttons: !buttons ? ['OK'] : buttons,
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
