import { RequisicaoService } from '../services/requisicao.service';

export class Movimento {
  public movimentos: any[] = [];

  constructor(private requisicao: RequisicaoService) {}

  getMovimentos(idConta: any) {
    const rota = `/fnc/buscarMovimentos?idConta=${idConta}`;

    return new Promise((resolve) => {
      this.requisicao.get(rota).subscribe(
        (data: any) => {
          resolve(data);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }

  inserirMovimento(parametros: any) {
    const { tipoMovimento, descricao, valor, data, conta, usuario } =
      parametros;

    const param = {
      tipoMovimento,
      descricao,
      valor,
      dataMovimento: data,
      idConta: conta,
      idUsuario: usuario,
    };

    const rota = '/fnc/incluirMovimento';

    this.requisicao.post(rota, param).subscribe(
      () => {},
      (err) => {
        console.log(err);
      }
    );
  }
}
