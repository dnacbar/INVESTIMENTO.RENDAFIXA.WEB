import { Component, inject, model, OnInit } from '@angular/core';
import { Investimento } from '../../../model/investimento';
import { Location, CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
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
  public investimentoModel = model<Investimento | null>(null);

  private location = inject(Location);

  constructor(public ngxMaskPipe: NgxMaskPipe, public datePipe: DatePipe, public currencyPipe: CurrencyPipe, public percentPipe: PercentPipe) { }

  ngOnInit(): void {
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
