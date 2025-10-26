import { Injectable } from '@angular/core';
import { Investidor } from '../model/investidor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestidorDataBinding {
  private investidorSubject$ = new BehaviorSubject<Investidor>(new Investidor());
  private habilitaSelecaoDeInvestidorSubject$ = new BehaviorSubject<boolean>(true);

  public investidorEmitter$ = this.investidorSubject$.asObservable();
  public habilitaSelecaoDeInvestidorEmitter$ = this.habilitaSelecaoDeInvestidorSubject$.asObservable();

  constructor() { }

  public enviaInvestidor(investidor: Investidor): void {
    this.investidorSubject$.next(investidor);
  }

  public enviaHabilitaSelecaoDeInvestidor(habilita: boolean): void {
    this.habilitaSelecaoDeInvestidorSubject$.next(habilita);
  }
}
