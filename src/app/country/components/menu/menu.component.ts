import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  countryForm!: FormGroup;
  @Input() type: string = '';
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
      console.log('first', term);
      this.handleDebounce.emit(term);
    });
  }

  onInput() {
    this.debouncer.next(this.countryForm.value.term);
  }

  private builForm() {
    this.countryForm = this.formBuilder.group({
      term: ['', [Validators.required]],
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
