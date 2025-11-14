import { Investidor } from './../../investidor/model/investidor';
import { ListaInvestimentoComResgateDisponivelResult } from './result/lista-investimento-com-resgate-disponivel-result';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListaInvestimentoResult } from './result/lista-investimento-result';
import { Investimento } from '../model/investimento';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaInvestimento {
  private httpClient = inject(HttpClient);

  public listaInvestimento(investidor: Investidor): Observable<Investimento[]> {
    return this.httpClient.get<ListaInvestimentoResult[]>(`${environment.urlBase}ConsultaInvestimento/Lista`, {
      params:
      {
        investidor: investidor.idInvestidor,
        docFederal: investidor.documentoFederal
      }
    }).pipe(map(x => x.map(result => Investimento.converteInvestimento(result))));
  }

  public listaInvestimentoComResgateDisponivel(investidor: Investidor): Observable<Investimento[]> {
    return this.httpClient.get<ListaInvestimentoComResgateDisponivelResult[]>(`${environment.urlBase}ConsultaInvestimento/ListaInvestimentoComResgateDisponivel`, {
      params: {
        investidor: investidor.idInvestidor,
        docFederal: investidor.documentoFederal
      }
    }).pipe(map(x => x.map(result => Investimento.converteInvestimentoComResgateDisponivel(result))));
  }
}
