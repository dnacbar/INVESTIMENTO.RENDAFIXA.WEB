import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListaCincoUltimasPosicoesResult } from './result/lista-cinco-ultimas-posicoes-result';
import { Posicao } from '../model/posicao';
import { ListaCincoUltimasPosicoesSignature } from './signature/lista-cinco-ultimas-posicoes-signature';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultaPosicao {
  private httpClient = inject(HttpClient);

  public listaCincoUltimasPosicoes(signature: ListaCincoUltimasPosicoesSignature): Observable<Posicao[]> {
    return this.httpClient.post<ListaCincoUltimasPosicoesResult[]>(environment.urlBase + 'ConsultaPosicao/ListaCincoUltimasPosicoes', signature)
      .pipe(map((x: ListaCincoUltimasPosicoesResult[]) => x.map(result => Posicao.convertePosicao(result))));
  }
}
