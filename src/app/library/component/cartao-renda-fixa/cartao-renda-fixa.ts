import { CurrencyPipe, DatePipe, Location, PercentPipe } from '@angular/common';
import { Component, inject, input, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-cartao-renda-fixa',
  imports: [RouterLink],
  templateUrl: './cartao-renda-fixa.html',
  styleUrl: './cartao-renda-fixa.scss'
})
export class CartaoRendaFixaComponent<T> {
  public dadoInput = input<T | null>(new Object() as T);
  public listaDePropriedadeInput = input<{ propriedade: keyof T | ((item: T) => string), titulo: string, pipe?: PipeTransform, caminho?: string }[]>([]);
  public cssTabelaInput = input('table table-striped table-bordered');
  public tituloCartaoInput = input('');

  private location = inject(Location);

  public obtemValor(item: T | null, propriedade: keyof T | ((item: T) => string), pipe?: PipeTransform): any {
    if (!item) return null;
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
