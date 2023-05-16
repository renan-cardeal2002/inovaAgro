import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoService {
  private url: string = '';
  constructor(private http: HttpClient) {
    this.url = environment.urlApi;
  }
  post(url: string, body: any, useBaseUrlPadrao = true, tipoResposta = 'json') {
    const obj: any = {
      headers: {},
      responseType: tipoResposta,
    };
    const urlMontada = useBaseUrlPadrao ? this.url + url : url;
    return this.http.post(urlMontada, body, obj);
  }

  get(url: string, useBaseUrlPadrao = true) {
    const obj = {
      headers: {},
    };
    const urlMontada = useBaseUrlPadrao ? this.url + url : url;
    return this.http.get(urlMontada, obj);
  }

  delete(url: string, useBaseUrlPadrao = true) {
    const obj = {
      headers: {},
    };
    const urlMontada = useBaseUrlPadrao ? this.url + url : url;
    return this.http.delete(urlMontada, obj);
  }

  put(url: string, body: any, useBaseUrlPadrao = true) {
    const obj = {
      headers: {},
    };
    const urlMontada = useBaseUrlPadrao ? this.url + url : url;
    return this.http.put(urlMontada, body, obj);
  }
}
