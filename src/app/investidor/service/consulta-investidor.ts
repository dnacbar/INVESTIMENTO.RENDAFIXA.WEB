import { ListaClienteComInvestimentoAtivoResult } from './result/lista-cliente-com-investimento-ativo-result';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Investidor } from '../model/investidor';

@Injectable({
  providedIn: 'root'
})
export class ConsultaInvestidor {
  private httpClient = inject(HttpClient);

  public listaInvestidor() : Observable<Investidor[]> {
    return this.httpClient.post<ListaClienteComInvestimentoAtivoResult[]>(`${environment.urlBase}ConsultaCliente/ListaClienteComInvestimentoAtivo`, {})
      .pipe(map(result => result.map(item => Investidor.converteInvestidor(item)))
      );
  }
}
