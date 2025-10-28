import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AdicionaBloqueioInvestimentoSignature } from './signature/adiciona-bloqueio-investimento-signature';

@Injectable({
  providedIn: 'root'
})
export class ManipulaBloqueioInvestimento {
  private httpCliente = inject(HttpClient);

  public adicionaBloqueioInvestimento(signature: AdicionaBloqueioInvestimentoSignature): Observable<void> {
    return this.httpCliente.post<void>(`${environment.urlBase}ManipulaBloqueioInvestimento/Adiciona`, signature);
  }
}
