import { CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Investimento } from '../../../model/investimento';
import { Component, input } from '@angular/core';
import { NgxMaskPipe } from 'ngx-mask';
import { Router } from '@angular/router';
import { TabelaRendaFixaComponent } from '../../../../../library/component/tabela-renda-fixa/tabela-renda-fixa';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, TabelaRendaFixaComponent],
  templateUrl: './lista.html',
  providers: [NgxMaskPipe, DatePipe, CurrencyPipe, PercentPipe],
  styleUrl: './lista.scss'
})
export class Lista {
  public listaDeInvestimentoInput = input<Investimento[]>([]);
  public investimentoInput = input<any | null>(null);

  constructor(public ngxMaskPipe: NgxMaskPipe, public datePipe: DatePipe, public currencyPipe: CurrencyPipe, public percentPipe: PercentPipe, private router: Router) {
  }

  public adicionaInvestimento(): void {
    this.router.navigateByUrl('/investimento/adiciona');
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
}