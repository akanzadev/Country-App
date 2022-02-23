import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country-name';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ByCapitalComponent {
  countries: Country[] = [];
  onError = '';
  constructor(private countryService: CountryService) {}
  onSubmit(term: string) {
    this.countryService.getByCapital(term).subscribe({
      next: (countries) => {
        this.countries = countries;
        this.onError = '';
      },
      error: (error) => {
        this.onError = error;
      },
    });
  }
}
