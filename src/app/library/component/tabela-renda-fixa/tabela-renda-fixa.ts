import { CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Component, inject, input, PipeTransform, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe } from 'ngx-mask';
import { TabelaRendaFixaDataBinding } from '../../service/tabela-renda-fixa-data-binding';

@Component({
  selector: 'app-tabela-renda-fixa',
  imports: [CommonModule, FormsModule],
  templateUrl: './tabela-renda-fixa.html',
  styleUrl: './tabela-renda-fixa.scss'
})
export class TabelaRendaFixaComponent<T> {
  public listaDeDadoInput = input<T[]>([]);
  public listaDeColunaInput = input<{ campo: keyof T | ((item: T) => any), titulo: string, pipe?: PipeTransform }[]>([]);
  public cssTabelaInput = input('table table-hover');
  public habilitaColunaAcaoInput = input(true);

  public quantidadePorPaginaSignal = signal(10);
  public paginaAtualSignal = signal(1);

  public tabelaRendaFixaDataBinding = inject(TabelaRendaFixaDataBinding<T>);

  get totalPaginas() {
    return Math.ceil(this.listaDeDadoInput().length / this.quantidadePorPaginaSignal());
  }

  get paginas() {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get dadosPaginados() {
    const inicio = (this.paginaAtualSignal() - 1) * this.quantidadePorPaginaSignal();
    return this.listaDeDadoInput().slice(inicio, inicio + this.quantidadePorPaginaSignal());
  }

  public obtemValor(item: T, campo: keyof T | ((item: T) => any), pipe?: PipeTransform): any {
    let valor: any;
    if (typeof campo === 'function') {
      valor = campo(item);
    } else {
      valor = item[campo];
    }
    if (!pipe)
      return valor;

    return pipe instanceof DatePipe ? pipe.transform(valor, 'dd/MM/yyyy') :
      pipe instanceof PercentPipe ? pipe.transform(valor, '1.2-2') :
        pipe instanceof CurrencyPipe ? pipe.transform(valor, 'BRL') :
          pipe instanceof NgxMaskPipe ? (valor.length == 11 ? pipe.transform(valor, '000.000.000-00') : pipe.transform(valor, '00.000.000/0000-00')) :
            pipe.transform(valor);
  }

  public irParaPrimeira() { this.paginaAtualSignal.set(1); }
  public irParaUltima() { this.paginaAtualSignal.set(this.totalPaginas); }
  public irParaAnterior() { if (this.paginaAtualSignal() > 1) this.paginaAtualSignal.set(this.paginaAtualSignal() - 1); }
  public irParaProxima() { if (this.paginaAtualSignal() < this.totalPaginas) this.paginaAtualSignal.set(this.paginaAtualSignal() + 1); }
  public irParaPagina(p: number) { this.paginaAtualSignal.set(p); }

  public aoMudarQuantidade(quantidade: number) {
    this.quantidadePorPaginaSignal.set(quantidade);
    this.paginaAtualSignal.set(1);
  }
}