import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country-name';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ByCountryComponent {
  countries: Country[] = [];
  onError = '';
  suggestions: Country[] = [];
  constructor(private countryService: CountryService) {}

  onSubmit(term: string) {
    this.countryService.getByName(term).subscribe({
      next: (countries) => {
        this.countries = countries;
        this.onError = '';
        this.suggestions = [];
      },
      error: (error) => {
        this.onError = error;
        this.suggestions = [];
      },
    });
  }

  onDebounce(term: string) {
    this.countryService.getByName(term).subscribe({
      next: (countries) => {
        this.onError = '';
        this.suggestions = countries.slice(0, 5);
      },
      error: (error) => {
        this.onError = error;
        this.suggestions = [];
      },
    });
  }
}
