export interface ClientDB {
    numéroclient: number;
    prénomclient: string;
    nomclient: string;
    adressecourrielclient: string;
    rueclient: string;
    villeclient: string;
    codepostalclient: string;
}
export interface PlanrepasDB {
    numéroplan: number;
    catégorie: number;
    fréquence: number;
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numérofournisseur: number;
}