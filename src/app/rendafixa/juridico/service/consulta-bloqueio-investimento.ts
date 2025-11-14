import { Investidor } from './../../investidor/model/investidor';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BloqueioInvestimento } from '../model/bloqueio-investimento';
import { ListaBloqueioInvestimentoResult } from './result/lista-bloqueio-investimento-result';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaBloqueioInvestimento {
  private httpClient = inject(HttpClient);

  public listaBloqueioInvestimento(investidor: Investidor): Observable<BloqueioInvestimento[]> {
    return this.httpClient.post<ListaBloqueioInvestimentoResult[]>(`${environment.urlBase}ConsultaBloqueioInvestimento/Lista`, {
      investidor: investidor.idInvestidor,
      docFederal: investidor.documentoFederal
    }) .pipe(map(x => x.map(result => BloqueioInvestimento.converteBloqueioInvestimento(result))));
  }
}
