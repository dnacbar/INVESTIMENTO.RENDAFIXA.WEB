import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TotalInvestimentoAnaliticoResult } from '../service/result/total-investimento-analitico-result';
import { TotalInvestimento } from '../model/total-investimento';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaAnaliticaInvestimento {

  constructor(private http: HttpClient) { }

  public consultaSomaDeInvestimentoQueNaoEstaLiquidado(): Observable<TotalInvestimento> {
    return this.http.get<TotalInvestimentoAnaliticoResult>(`${environment.urlBase}ConsultaAnaliticaInvestimento/ConsultaSomaDeInvestimento`, {})
      .pipe(map(result => TotalInvestimento.converteTotalInvestimento(result)));
  }
}
