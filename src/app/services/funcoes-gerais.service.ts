import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuncoesGeraisService {
  formataValores(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }
  formataData(data: Date, formato: number): string {
    if (!data) return '';

    let retorno = '';

    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const yyyy = data.getFullYear();

    switch (formato) {
      case 1:
        retorno = `${mm}/${dd}/${yyyy}`;
        break;
      case 2:
        retorno = `${mm}-${dd}-${yyyy}`;
        break;
      case 3:
        retorno = `${yyyy}-${mm}-${dd}`;
        break;
      case 4:
        retorno = `${yyyy}/${mm}/${dd}`;
        break;
      case 5:
        retorno = `${dd}/${mm}/${yyyy}`;
        break;
      case 6:
        retorno = `${dd}-${mm}-${yyyy}`;
        break;
      default:
        retorno = '';
    }

    return retorno;
  }
}
