import { ListaCincoUltimosImpostosPosicoesResult } from "./lista-cinco-ultimos-impostos-posicoes-result";

export interface ListaCincoUltimasPosicoesResult {
  posicao: number;
  dtPosicao: Date;
  vlBrutoTotal: number;
  vlLiquidoTotal: number;
  vlBruto: number;
  vlLiquido: number;
  listaImpostoPosicao: ListaCincoUltimosImpostosPosicoesResult[];
}