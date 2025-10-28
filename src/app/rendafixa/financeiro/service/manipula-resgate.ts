import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AdicionaResgateSignature } from './signature/adiciona-resgate-signature';

@Injectable({
  providedIn: 'root'
})
export class ManipulaResgate {
  private httpCliente = inject(HttpClient);

  public adicionaResgate(signature: AdicionaResgateSignature): Observable<string> {
    return this.httpCliente.post<string>(`${environment.urlBase}ManipulaResgate/Adiciona`, signature);
  }
}
