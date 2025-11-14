import { Investidor } from './../../investidor/model/investidor';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Resgate } from '../model/resgate';
import { ListaResgateDoInvestidorResult } from './result/lista-resgate-do-investidor-result';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaResgate {

  private httpClient = inject(HttpClient);

  public listaResgateDoInvestidor(investidor: Investidor): Observable<Resgate[]> {
    return this.httpClient.get<ListaResgateDoInvestidorResult[]>(`${environment.urlBase}ConsultaResgate/Lista`, {
      params: {
        investidor: investidor.idInvestidor,
        docFederal: investidor.documentoFederal
      }
    }).pipe(map(x => x.map(result => Resgate.converteResgate(result))));
  }
}
