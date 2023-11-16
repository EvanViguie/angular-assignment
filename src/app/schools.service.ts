import { Injectable } from '@angular/core';
import{ Schooldetails} from "./schooldetails";

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<Schooldetails[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<Schooldetails | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received; firstName: ${firstName}, lastName:
    ${lastName}, email: ${email}.`);
  }
}
