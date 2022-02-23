import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country-name';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class ByRegionComponent {
  countries: Country[] = [];
  regionActive = '';
  regions: Array<string> = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  /* onError = ''; */
  constructor(private countryService: CountryService) {}
  /* onSubmit(term: string) {
    this.countryService.getByRegion(term).subscribe({
      next: (countries) => {
        this.countries = countries;
        this.onError = '';
      },
      error: (error) => {
        this.onError = error;
      },
    });
  } */

  getClassCss(region: string) {
    return this.regionActive === region ? 'bg-slate-900' : 'bg-slate-500';
  }

  activeRegion(region: string) {
    if (this.regionActive === region) return;
    this.regionActive = region;
    this.countries = [];
    this.countryService.getByRegion(region).subscribe({
      next: (countries) => {
        this.countries = countries;
        console.log(countries);
      },
    });
  }
}
