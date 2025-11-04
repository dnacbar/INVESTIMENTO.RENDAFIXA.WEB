import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabelaRendaFixaDataBinding<T> {
  private enviaItemSelecionado$ = new Subject<T>();
  public eventoEnviaItemSelecionado$ = this.enviaItemSelecionado$.asObservable(); 

  public enviaItemSelecionado(item: T): void {
    this.enviaItemSelecionado$.next(item);
  }
}
