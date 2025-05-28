import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PastebinService } from '../../services/pastebin.service';

@Component({
  selector: 'app-pastebin-input',
  template: `
    <div class="pastebin-input">
      <form [formGroup]="pastebinForm" (ngSubmit)="loadFromPastebin()">
        <div class="form-group">
          <label for="pastebin-url">Pastebin URL:</label>
          <input 
            type="text" 
            id="pastebin-url" 
            formControlName="url"
            placeholder="https://pastebin.com/..."
            class="form-control"
            [class.is-invalid]="isInvalid('url')"
          >
          <div class="error-message" *ngIf="isInvalid('url')">
            <span *ngIf="pastebinForm.get('url')?.errors?.['required']">
              Please enter a pastebin URL.
            </span>
            <span *ngIf="pastebinForm.get('url')?.errors?.['invalidUrl']">
              Please enter a valid pastebin URL.
            </span>
          </div>
        </div>
        
        <button 
          type="submit" 
          class="load-button" 
          [disabled]="pastebinForm.invalid || isLoading">
          {{ isLoading ? 'Loading...' : 'Load from Pastebin' }}
        </button>
      </form>
      
      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .pastebin-input {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    label {
      font-weight: 500;
    }
    
    .form-control {
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    
    .form-control.is-invalid {
      border-color: #dc3545;
    }
    
    .load-button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 10px;
    }
    
    .load-button:hover:not(:disabled) {
      background-color: #0069d9;
    }
    
    .load-button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    
    .error-message {
      color: #dc3545;
      font-size: 14px;
    }
  `]
})
export class PastebinInputComponent {
  @Output() dataLoaded = new EventEmitter<string>();
  
  pastebinForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private pastebinService: PastebinService
  ) {
    this.pastebinForm = this.fb.group({
      url: ['', [
        Validators.required,
        this.pastebinUrlValidator.bind(this)
      ]]
    });
  }
  
  isInvalid(controlName: string): boolean {
    const control = this.pastebinForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  
  pastebinUrlValidator(control: any) {
    if (!control.value) {
      return null;
    }
    
    return this.pastebinService.isValidPastebinUrl(control.value) 
      ? null 
      : { invalidUrl: true };
  }
  
  loadFromPastebin(): void {
    if (this.pastebinForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    const url = this.pastebinForm.get('url')?.value;
    
    this.pastebinService.getPastebin(url).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dataLoaded.emit(response.data);
      },
      error: (error) => {
        console.error('Error loading from pastebin:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load data from pastebin. Please check the URL and try again.';
      }
    });
  }
}