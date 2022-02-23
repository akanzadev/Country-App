import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country, Translation } from '../../models/country-name';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class CountryDetailComponent implements OnInit {
  country!: Country;
  googleMapsUrl!: SafeUrl;
  translations!: Translation[];
  languages: string = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly countryService: CountryService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) return this.countryService.getByCode(id);
          return of(null);
        })
      )
      .subscribe({
        next: (country) => {
          if (country) {
            this.country = country[0];
            this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://maps.google.com/maps?q=${this.country.latlng[0]},${this.country.latlng[1]}&hl=en&z=14&amp&output=embed`
            );
            this.translations = Object.keys(this.country.translations).map(
              (key) => ({
                official: this.country.translations[key].official,
                common: this.country.translations[key].common,
              })
            );
            this.languages = Object.values(this.country.languages).join(', ');
          } else {
            this.router.navigate(['/country']);
          }
        },
      });
  }
}
