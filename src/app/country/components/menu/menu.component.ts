import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Country } from '../../models/country-name';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  countryForm!: FormGroup;
  @Input() type: string = '';
  @Input() suggestions: Country[] = [];
  @Output() isError = new EventEmitter<boolean>();
  @Output() handleDebounce = new EventEmitter<string>();
  debouncer = new Subject<string>();

  @Output() term = new EventEmitter<string>();
  @Input() errorText: string = '';
  constructor(private formBuilder: FormBuilder) {
    this.builForm();
  }

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(1000)).subscribe((term) => {
      this.handleDebounce.emit(term);
    });
  }

  onInput() {
    if (this.countryForm.valid) {
      this.debouncer.next(this.countryForm.value.term);
    } else {
      this.debouncer.next('');
    }
  }

  private builForm() {
    this.countryForm = this.formBuilder.group({
      term: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  onSubmit() {
    if (this.countryForm.valid) {
      this.term.emit(this.countryForm.value.term);
    } else {
      this.countryForm.markAllAsTouched();
    }
  }
}
