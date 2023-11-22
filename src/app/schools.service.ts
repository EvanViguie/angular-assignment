import {Injectable} from '@angular/core';
import {Schooldetails} from "./schooldetails";
import {HttpClient} from '@angular/common/http';
import {take} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class SchoolsService {
    private url: string = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?"

    constructor(
        private http: HttpClient,
    ) {
    }

    async getSchoolDetailsById(id: string): Promise<Schooldetails | undefined> {
        const url: string = `${this.url}refine=identifiant_de_l_etablissement%3A"${id}"`;
        return this.http.get<{ results: Schooldetails[] }>(this.url)
            .pipe(take(1))
            .toPromise()
            .then((res: { results: Schooldetails[] } | undefined): Schooldetails | undefined => {
                return res && res.results && res.results.length > 0 ? res.results[0] : undefined;
            });
    }


    submitContact(prenom: string,
                  nom: string,
                  email: string,
                  objet: string,
                  message: string,
                  cgu: string
    ):
        void {
        console.log(`Contact received; firstName: ${prenom}, lastName:
    ${nom}, email: ${email}, objet: ${objet}, message: ${message}, cgu: ${cgu}`);
    }
}
