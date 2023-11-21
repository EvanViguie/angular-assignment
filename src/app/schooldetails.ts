/**
 * Ce fichier contient une interface "Schooldetails" qui définit la structure des détails d'une école.
 */
export interface Schooldetails {
    identifiant_de_l_etablissement: string;
    nom_etablissement: string;
    position: {
        lon: number;
        lat: number;
    };
    adresse_1: string;
    type_etablissement: string;
    statut_public_prive: string;
}

