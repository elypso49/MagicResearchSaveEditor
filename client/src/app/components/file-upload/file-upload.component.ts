import { Component, EventEmitter, Output } from '@angular/core';
import { SaveFileService } from '../../services/save-file.service';

@Component({
  selector: 'app-file-upload',
  template: `
    <div class="file-upload">
      <div class="file-input-container">
        <input 
          type="file" 
          id="file-input" 
          (change)="onFileSelected($event)"
          accept=".txt,.json,application/json,text/plain"
          #fileInput
        >
        <label for="file-input" class="file-label">
          <span class="file-icon">📁</span>
          <span class="file-text">{{ selectedFile ? selectedFile.name : 'Choose a save file' }}</span>
        </label>
      </div>
      
      <button 
        class="upload-button" 
        [disabled]="!selectedFile" 
        (click)="uploadFile()">
        Load Save File
      </button>
      
      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .file-upload {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .file-input-container {
      position: relative;
    }
    
    input[type="file"] {
      position: absolute;
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      z-index: -1;
    }
    
    .file-label {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background-color: #f8f9fa;
      border: 1px dashed #ced4da;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .file-label:hover {
      background-color: #e9ecef;
    }
    
    .file-icon {
      font-size: 24px;
      margin-right: 10px;
    }
    
    .file-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .upload-button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .upload-button:hover:not(:disabled) {
      background-color: #0069d9;
    }
    
    .upload-button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    
    .error-message {
      color: #dc3545;
      font-size: 14px;
    }
  `]
})
export class FileUploadComponent {
  @Output() fileLoaded = new EventEmitter<string>();
  
  selectedFile: File | null = null;
  errorMessage: string = '';
  
  constructor(private saveFileService: SaveFileService) { }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = '';
    }
  }
  
  async uploadFile(): Promise<void> {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first.';
      return;
    }
    
    try {
      const fileContent = await this.saveFileService.readFile(this.selectedFile);
      this.fileLoaded.emit(fileContent);
    } catch (error) {
      console.error('Error reading file:', error);
      this.errorMessage = 'Failed to read the file. Please try again.';
    }
  }
}