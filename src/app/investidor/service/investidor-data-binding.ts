import { Injectable } from '@angular/core';
import { Investidor } from '../model/investidor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestidorDataBinding {
  private investidorSubject$ = new BehaviorSubject<Investidor>(new Investidor());
  
  public investidorEmitter$ = this.investidorSubject$.asObservable();

  constructor() { }

  public enviaInvestidor(investidor: Investidor): void {
    this.investidorSubject$.next(investidor);
  }
}
