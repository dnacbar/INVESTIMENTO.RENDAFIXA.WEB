export interface ListaInvestimentoResult {
    investimento: string;        
    investidor: string;        
    docFederal: string;
    vlInicial: number;         
    vlFinal: number;
    diasCarencia: number;
    vlImposto: number;
    taxaRendimento: number;
    taxaAdicional: number;
    dtInicial: Date;
    dtFinal: Date;
    indexador: number;      
    isentoImposto: boolean;
    liquidezDiaria: boolean;
    vlBloqueadoTotal: number;
    liquidado: boolean;
}
