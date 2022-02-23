import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CountryRoutingModule } from './country-routing.module';
import { ResultsComponent } from './components/results/results.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ByCapitalComponent,
    ByCountryComponent,
    ByRegionComponent,
    CountryDetailComponent,
    MenuComponent,
    ResultsComponent,
  ],
  exports: [
    ByCapitalComponent,
    ByCountryComponent,
    ByRegionComponent,
    CountryDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CountryRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CountryModule {}
