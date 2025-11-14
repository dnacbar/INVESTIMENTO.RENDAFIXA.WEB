// Serviço para manipulação de investimentos
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Investimento } from '../model/investimento';

@Injectable({ providedIn: 'root' })
export class ManipulaInvestimento {
  private httpCliente = inject(HttpClient);

  public adicionaInvestimento(investimento: Investimento): Observable<string> {
    return this.httpCliente.post<string>(`${environment.urlBase}ManipulaInvestimento/Adiciona`,
      {
        investidor: investimento.idInvestidor,
        docFederal: investimento.txDocumentoFederal || null,
        vlInicial: investimento.nmValorInicial,
        diasCarencia: investimento.nmDiasCarencia,
        txRendimento: investimento.nmTaxaRendimento,
        txAdicional: investimento.nmTaxaAdicional,
        dtInicial: investimento.dtInicial instanceof Date ? investimento.dtInicial.toISOString().substring(0, 10) : String(investimento.dtInicial),
        dtFinal: investimento.dtFinal instanceof Date ? investimento.dtFinal.toISOString().substring(0, 10) : String(investimento.dtFinal),
        indexador: investimento.enumIndexador,
        isentoImposto: investimento.boIsentoImposto,
        liquidezDiaria: investimento.boLiquidezDiaria,
        usuario: 'WEBSERVICE'
      });
  }
}
