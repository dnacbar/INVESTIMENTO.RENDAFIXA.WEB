import { ListaCincoUltimasPosicoesResult } from "../service/result/lista-cinco-ultimas-posicoes-result";
import { PosicaoImposto } from "./posicao-imposto";

export class Posicao {
    public idInvestimento = '';
    public cdInvestimento = 0;
    public idPosicao = 0;
    public dtPosicao = new Date();
    public nmValorBrutoTotal = 0;
    public nmValorLiquidoTotal = 0;
    public nmValorBruto = 0;
    public nmValorLiquido = 0;
    public nmValorImpostoTotal = 0;

    public listaDeImposto: PosicaoImposto[] = [];

    public static convertePosicao(result: ListaCincoUltimasPosicoesResult): Posicao {
        const posicao = new Posicao();

        if (!result)
            return posicao;

        posicao.idInvestimento = '';
        posicao.cdInvestimento = 0;
        posicao.idPosicao = result?.posicao;
        posicao.dtPosicao = new Date(result?.dtPosicao);
        posicao.nmValorBrutoTotal = result?.vlBrutoTotal;
        posicao.nmValorLiquidoTotal = result?.vlLiquidoTotal;
        posicao.nmValorBruto = result?.vlBruto;
        posicao.nmValorLiquido = result?.vlLiquido;

        posicao.listaDeImposto = result.listaImpostoPosicao?.map(x => {
            const imposto = new PosicaoImposto();
            imposto.enumTipoImposto = x.tipoImposto;
            imposto.nmValorImposto = x.vlImposto;
            posicao.nmValorImpostoTotal += x.vlImposto;
            return imposto;
        }) || [];

        return posicao;
    }
}
