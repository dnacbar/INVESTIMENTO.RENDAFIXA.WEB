// Serviço para manipulação de investimentos
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdicionaInvestimentoSignature } from './signature/adiciona-investimento-signature';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ManipulaInvestimento {
  private httpCliente = inject(HttpClient);

  public adicionaInvestimento(signature: AdicionaInvestimentoSignature): Observable<string> {
    return this.httpCliente.post<string>(`${environment.urlBase}ManipulaInvestimento/Adiciona`, signature);
  }
}
