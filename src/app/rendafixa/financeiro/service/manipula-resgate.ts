import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Resgate } from '../model/resgate';

@Injectable({
  providedIn: 'root'
})
export class ManipulaResgate {
  private httpCliente = inject(HttpClient);

  public adicionaResgate(resgate: Resgate): Observable<string> {
    return this.httpCliente.post<string>(`${environment.urlBase}ManipulaResgate/Adiciona`,
      {
        investimento: resgate.idInvestimento,
        valor: resgate.nmValorResgate,
        usuario: 'WEBSERVICE'
      });
  }
}
