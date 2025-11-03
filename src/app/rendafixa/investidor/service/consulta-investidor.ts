import { ListaClienteComInvestimentoAtivoResult } from './result/lista-cliente-com-investimento-ativo-result';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Investidor } from '../model/investidor';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaInvestidor {
  private httpClient = inject(HttpClient);

  public listaInvestidor() : Observable<Investidor[]> {
    return this.httpClient.post<ListaClienteComInvestimentoAtivoResult[]>(`${environment.urlBase}ConsultaInvestidor/Lista`, {})
      .pipe(map(result => result.map(item => Investidor.converteEmInvestidor(item)))
      );
  }
}
