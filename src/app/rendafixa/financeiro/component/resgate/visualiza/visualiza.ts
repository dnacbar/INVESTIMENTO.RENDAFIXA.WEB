import { Component, inject, signal } from '@angular/core';
import { Resgate } from '../../../model/resgate';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { CartaoRendaFixaComponent } from '../../../../../library/component/cartao-renda-fixa/cartao-renda-fixa';

@Component({
  selector: 'app-visualiza',
  imports: [CartaoRendaFixaComponent],
  templateUrl: './visualiza.html',
  providers: [CurrencyPipe, DatePipe],
  styleUrl: './visualiza.scss'
})
export class Visualiza {
  public resgateSignal = signal<Resgate>(new Resgate());

  private investidorDataBinding = inject(InvestidorDataBinding);
  private location = inject(Location);

  constructor(public datePipe: DatePipe, public currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    const navigationState = window.history.state;

    if (!navigationState.resgate)
      this.location.back();

    this.resgateSignal.set(Object.assign(new Resgate(), navigationState.resgate));
    this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(false);
  }

  public voltaIndex() {
    this.location.back();
  }
}
