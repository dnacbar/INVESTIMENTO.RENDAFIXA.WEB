import { ListaUltimosImpostosPosicoesResult } from "./lista-ultimos-impostos-posicoes-result";

export interface ListaUltimasPosicoesResult {
  posicao: number;
  dtPosicao: Date;
  vlBrutoTotal: number;
  vlLiquidoTotal: number;
  vlBruto: number;
  vlLiquido: number;
  listaImpostoPosicao: ListaUltimosImpostosPosicoesResult[];
}