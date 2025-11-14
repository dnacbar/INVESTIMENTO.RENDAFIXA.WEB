import { BloqueioInvestimento } from './../model/bloqueio-investimento';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManipulaBloqueioInvestimento {
  private httpCliente = inject(HttpClient);

  public adicionaBloqueioInvestimento(bloqueioInvestimento: BloqueioInvestimento): Observable<void> {
    return this.httpCliente.post<void>(`${environment.urlBase}ManipulaBloqueioInvestimento/Adiciona`, {
      investimento: bloqueioInvestimento.idInvestimento,
      vlBloqueado: bloqueioInvestimento.nmValorBloqueado,
      motivo: bloqueioInvestimento.txMotivo,
      usuario: 'WEBSERVICE'
    });
  }
}
