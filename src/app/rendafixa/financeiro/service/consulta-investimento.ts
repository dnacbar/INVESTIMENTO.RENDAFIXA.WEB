import { ListaInvestimentoComResgateDisponivelResult } from './result/lista-investimento-com-resgate-disponivel-result';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ListaInvestimentoSignature } from './signature/lista-investimento-signature';
import { map, Observable } from 'rxjs';
import { ListaInvestimentoResult } from './result/lista-investimento-result';
import { Investimento } from '../model/investimento';
import { environment } from '../../../../environments/environment.development';
import { ListaInvestimentoComResgateDisponivelSignature } from './signature/lista-investimento-com-resgate-disponivel-signature';

@Injectable({
  providedIn: 'root'
})
export class ConsultaInvestimento {
  private httpClient = inject(HttpClient);

  public listaInvestimentoQueNaoEstaLiquidado(signature: ListaInvestimentoSignature): Observable<Investimento[]> {
    return this.httpClient.post<ListaInvestimentoResult[]>(`${environment.urlBase}ConsultaInvestimento/ListaInvestimento`, signature)
    .pipe(map(x => x.map(result => Investimento.converteInvestimento(result))));
  }

  public listaInvestimentoComResgateDisponivel(signature: ListaInvestimentoComResgateDisponivelSignature): Observable<Investimento[]> {
    return this.httpClient.post<ListaInvestimentoComResgateDisponivelResult[]>(`${environment.urlBase}ConsultaInvestimento/ListaInvestimentoComResgateDisponivel`, signature)
    .pipe(map(x => x.map(result => Investimento.converteInvestimentoComResgateDisponivel(result))));
  }
}
