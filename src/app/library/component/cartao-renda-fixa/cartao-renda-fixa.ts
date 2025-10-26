import { CurrencyPipe, DatePipe, Location, PercentPipe } from '@angular/common';
import { Component, inject, Input, PipeTransform, Signal } from '@angular/core';
import { NgxMaskPipe } from 'ngx-mask';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-cartao-renda-fixa',
  templateUrl: './cartao-renda-fixa.html',
  styleUrl: './cartao-renda-fixa.scss'
})
export class CartaoRendaFixaComponent<T> {
  @Input() dado!: T;
  @Input() listaDePropriedade: { propriedade: keyof T | ((item: T) => string), titulo: string, pipe: PipeTransform | null }[] = [];
  @Input() cssTabela = 'table table-striped table-bordered';
  @Input() tituloCartao = '';

  private location = inject(Location);
  private router = inject(Router);

  public obtemValor(item: T, propriedade: keyof T | ((item: T) => string), pipe: PipeTransform | null): any {
    let valor: any;
    if (typeof propriedade === 'function') {
      valor = propriedade(item);
    } else {
      valor = item[propriedade];
    }
    if (!pipe)
      return valor;

    return pipe instanceof DatePipe ? pipe.transform(valor, 'dd/MM/yyyy') :
      pipe instanceof PercentPipe ? pipe.transform(valor, '1.2-2') :
        pipe instanceof CurrencyPipe ? pipe.transform(valor, 'BRL') :
          pipe instanceof NgxMaskPipe ? (valor.length == 11 ? pipe.transform(valor, '000.000.000-00') : pipe.transform(valor, '00.000.000/0000-00')) :
            pipe.transform(valor);
  }

  public voltaIndex(): void {
    this.location.back();
  }
}
