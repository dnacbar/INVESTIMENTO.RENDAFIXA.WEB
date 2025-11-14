import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListaUltimasPosicoesResult as ListaUltimasPosicoesResult } from './result/lista-ultimas-posicoes-result';
import { Posicao } from '../model/posicao';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaPosicao {
  private httpClient = inject(HttpClient);

  public listaCincoUltimasPosicoes(investimento: string): Observable<Posicao[]> {
    return this.httpClient.get<ListaUltimasPosicoesResult[]>(environment.urlBase + 'ConsultaPosicao/ListaCincoUltimasPosicoes', { params: { investimento } })
      .pipe(map((x: ListaUltimasPosicoesResult[]) => x.map(result => Posicao.convertePosicao(result))));
  }
}
