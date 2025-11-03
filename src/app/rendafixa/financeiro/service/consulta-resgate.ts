import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Resgate } from '../model/resgate';
import { ListaResgateDoInvestidorResult } from './result/lista-resgate-do-investidor-result';
import { ListaResgateDoInvestidorSignature } from './signature/lista-resgate-do-investidor-signature';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaResgate {

  private httpClient = inject(HttpClient);

  public listaResgateDoInvestidor(signature: ListaResgateDoInvestidorSignature): Observable<Resgate[]> {
    return this.httpClient.post<ListaResgateDoInvestidorResult[]>(`${environment.urlBase}ConsultaResgate/Lista`, signature)
      .pipe(map(x => x.map(result => Resgate.converteResgate(result))));
  }
}
