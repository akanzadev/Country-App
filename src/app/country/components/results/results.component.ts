import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../models/country-name';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() countries: Country[] = [];
  constructor() {}
}
