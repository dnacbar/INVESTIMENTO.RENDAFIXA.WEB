import { Component, inject, OnInit, model } from '@angular/core';
import { Investimento } from '../../../model/investimento';
import { Location, CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { InvestidorDataBinding } from '../../../../investidor/service/investidor-data-binding';
import { NgxMaskPipe } from 'ngx-mask';
import { CartaoRendaFixaComponent } from '../../../../../library/component/cartao-renda-fixa/cartao-renda-fixa';

@Component({
  selector: 'app-visualiza',
  standalone: true,
  templateUrl: './visualiza.html',
  styleUrl: './visualiza.scss',
  providers: [NgxMaskPipe, DatePipe, CurrencyPipe, PercentPipe],
  imports: [CommonModule, CartaoRendaFixaComponent]
})
export class Visualiza implements OnInit {
  public investimentoSignal = model<Investimento>(new Investimento());

  private investidorDataBinding = inject(InvestidorDataBinding);
  private location = inject(Location);

  constructor(public ngxMaskPipe: NgxMaskPipe, public datePipe: DatePipe, public currencyPipe: CurrencyPipe, public percentPipe: PercentPipe) { }

  ngOnInit(): void {
    const navigationState = window.history.state;

    if (!navigationState.investimento)
      this.location.back();

    this.investimentoSignal.set(Object.assign(new Investimento(), navigationState.investimento));
    this.investidorDataBinding.enviaHabilitaSelecaoDeInvestidor(false);
  }

  public exibeIndexador(i: Investimento): string {
    return i.exibeIndexador();
  }

  public exibeIsentoImposto(i: Investimento): string {
    return i.exibeIsentoImposto();
  }

  public exibeLiquidado(i: Investimento): string {
    return i.exibeLiquidado();
  }

  public exibeLiquidezDiaria(i: Investimento): string {
    return i.exibeLiquidezDiaria();
  }

  public voltaIndex() {
    this.location.back();
  }
}
