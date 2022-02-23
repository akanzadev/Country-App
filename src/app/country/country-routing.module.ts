import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'by-country',
  },
  {
    path: 'by-country',
    component: ByCountryComponent,
  },
  {
    path: 'by-capital',
    component: ByCapitalComponent,
  },
  {
    path: 'by-region',
    component: ByRegionComponent,
  },
  {
    path: 'country/:id',
    component: CountryDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule {}
