import { AdicionaBloqueioInvestimentoSignature } from './../service/signature/adiciona-bloqueio-investimento-signature';
import { ListaBloqueioInvestimentoResult } from "../service/result/lista-bloqueio-investimento-result";

export class BloqueioInvestimento {

    public idInvestimento = '';
    public nmValorBloqueado = 0;
    public txMotivo = '';
    public boCarrengandoBloqueioInvestimento = false;

    public converteEmAdicionaBloqueioInvestimentoSignature(): AdicionaBloqueioInvestimentoSignature {
        return {
            investimento: this.idInvestimento,
            vlBloqueado: this.nmValorBloqueado,
            motivo: this.txMotivo,
            usuario: 'WEBSERVICE'
        } as AdicionaBloqueioInvestimentoSignature;
    }
    
    public static converteBloqueioInvestimento(result: ListaBloqueioInvestimentoResult): BloqueioInvestimento {
        const retorno = new BloqueioInvestimento();

        if (!result)
            return retorno;

        retorno.idInvestimento = result?.investimento;
        retorno.nmValorBloqueado = result?.vlBloqueado;
        retorno.txMotivo = result?.motivo;

        return retorno;
    }
}
