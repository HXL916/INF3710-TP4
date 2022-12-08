export interface PlanrepasDB {
    numéroplan: number;
    catégorie: number;
    fréquence: number;
    nbrpersonnes: number;
    nbrcalories: number;
    prix: number;
    numérofournisseur: number;
}

export interface FournisseurDB {
    numérofournisseur: number;
    numéroplan: number;
    adressefournisseur: string;
}