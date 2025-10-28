import { Component, Input, Signal } from '@angular/core';
import { Resgate } from '../../../model/resgate';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TabelaRendaFixaComponent } from '../../../../../library/component/tabela-renda-fixa/tabela-renda-fixa';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, TabelaRendaFixaComponent],
  templateUrl: './lista.html',
  providers: [DatePipe, CurrencyPipe],
  styleUrl: './lista.scss'
})
export class Lista {
  @Input() listaDeResgateSignal!: Signal<Resgate[]>;

  constructor(public datePipe: DatePipe, public currencyPipe: CurrencyPipe, private router: Router) { }
  
  public adicionaResgate(): void {
    this.router.navigateByUrl('/resgate/adiciona');
  }

  public visualizaResgate(resgate: Resgate): void {
    this.router.navigateByUrl('/resgate/visualiza', { state: { resgate: resgate } });
  }
}
