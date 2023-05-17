import { Storage } from '@ionic/storage';

export class Ocorrencias {
  public storage: Storage;
  public ocorrencias: any[];

  constructor(public store: Storage) {
    this.storage = store;
  }

  async getOcorrencias() {
    await this.storage.get('ocorrencias').then((data) => {
      if (data) {
        this.ocorrencias = data.toReversed();
      }
    });
  }

  async setOcorrencias(param: any[]) {
    this.storage.set('ocorrencias', param);
  }
}
