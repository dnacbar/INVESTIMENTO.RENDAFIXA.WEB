import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ListaInvestimentoQueNaoEstaLiquidadoSignature } from './signature/lista-investimento-que-nao-esta-liquidado-signature';
import { map, Observable } from 'rxjs';
import { ListaInvestimentoQueNaoEstaLiquidadoResult } from './result/lista-investimento-que-nao-esta-liquidado-result';
import { environment } from '../../../environments/environment.development';
import { Investimento } from '../model/investimento';

@Injectable({
  providedIn: 'root'
})
export class InvestimentoService {
  private httpClient = inject(HttpClient);

  public listaInvestimentoQueNaoEstaLiquidado(signature: ListaInvestimentoQueNaoEstaLiquidadoSignature): Observable<Investimento[]> {
    return this.httpClient.post<ListaInvestimentoQueNaoEstaLiquidadoResult[]>(`${environment.urlBase}ConsultaInvestimento/ListaInvestimentoQueNaoEstaLiquidado`, signature)
    .pipe(map(results => results.map(result => Investimento.converteInvestimento(result))));
  }
}
