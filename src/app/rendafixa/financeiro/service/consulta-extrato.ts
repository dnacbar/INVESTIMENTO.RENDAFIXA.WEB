import { Extrato } from './../model/extrato';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ListaExtratoResult } from './result/lista-extrato-result';

@Injectable({
  providedIn: 'root'
})
export class ConsultaExtrato {
  private httpClient = inject(HttpClient);

  public listaExtrato(investimento: string): Observable<Extrato[]> {
    return this.httpClient.get<ListaExtratoResult[]>(`${environment.urlBase}ConsultaExtrato/Lista`, { params: { investimento } })
      .pipe(map(x => { return x.map(result => Extrato.converteExtrato(result)); }));
  }
}
