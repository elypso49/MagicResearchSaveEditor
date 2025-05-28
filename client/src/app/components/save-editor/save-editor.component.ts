import { Component, OnInit } from '@angular/core';
import { SaveFileService } from '../../services/save-file.service';
import { PastebinService } from '../../services/pastebin.service';

@Component({
  selector: 'app-save-editor',
  template: `
    <div class="save-editor">
      <div class="input-section">
        <h2>Load Save File</h2>
        <div class="tabs">
          <button 
            [class.active]="activeTab === 'file'" 
            (click)="activeTab = 'file'">
            From File
          </button>
          <button 
            [class.active]="activeTab === 'pastebin'" 
            (click)="activeTab = 'pastebin'">
            From Pastebin
          </button>
        </div>
        
        <div class="tab-content">
          <app-file-upload 
            *ngIf="activeTab === 'file'"
            (fileLoaded)="onFileLoaded($event)">
          </app-file-upload>
          
          <app-pastebin-input 
            *ngIf="activeTab === 'pastebin'"
            (dataLoaded)="onPastebinLoaded($event)">
          </app-pastebin-input>
        </div>
      </div>
      
      <div class="editor-section" *ngIf="saveData">
        <h2>Edit Save File</h2>
        <app-json-editor 
          [data]="saveData"
          (dataChanged)="onDataChanged($event)">
        </app-json-editor>
      </div>
      
      <div class="export-section" *ngIf="saveData">
        <h2>Export Save File</h2>
        <app-export-options
          [data]="saveData"
          (exportToFile)="onExportToFile()"
          (exportToPastebin)="onExportToPastebin()">
        </app-export-options>
      </div>
      
      <div class="loading-overlay" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>{{ loadingMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .save-editor {
      position: relative;
    }
    
    .input-section, .editor-section, .export-section {
      margin-bottom: 30px;
      padding: 20px;
      border-radius: 5px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-top: 0;
      color: #333;
    }
    
    .tabs {
      display: flex;
      margin-bottom: 20px;
    }
    
    .tabs button {
      flex: 1;
      padding: 10px;
      background-color: #eee;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .tabs button.active {
      background-color: #007bff;
      color: white;
    }
    
    .tab-content {
      padding: 20px;
      background-color: white;
      border-radius: 0 0 5px 5px;
    }
    
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SaveEditorComponent implements OnInit {
  activeTab: 'file' | 'pastebin' = 'file';
  saveData: any = null;
  isLoading = false;
  loadingMessage = 'Loading...';
  
  constructor(
    private saveFileService: SaveFileService,
    private pastebinService: PastebinService
  ) { }

  ngOnInit(): void {
  }

  onFileLoaded(data: string): void {
    this.decryptSaveFile(data);
  }

  onPastebinLoaded(data: string): void {
    this.decryptSaveFile(data);
  }

  onDataChanged(data: any): void {
    this.saveData = data;
  }

  onExportToFile(): void {
    this.isLoading = true;
    this.loadingMessage = 'Encrypting save file...';
    
    this.saveFileService.encryptSaveFile(this.saveData).subscribe({
      next: (response) => {
        this.saveFileService.downloadFile(response.data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error encrypting save file:', error);
        alert('Failed to encrypt save file. Please try again.');
        this.isLoading = false;
      }
    });
  }

  onExportToPastebin(): void {
    this.isLoading = true;
    this.loadingMessage = 'Creating pastebin...';
    
    this.saveFileService.encryptSaveFile(this.saveData).subscribe({
      next: (encryptResponse) => {
        this.pastebinService.createPastebin(encryptResponse.data, 'Game Save File').subscribe({
          next: (pastebinResponse) => {
            alert(`Save file uploaded to pastebin: ${pastebinResponse.url}`);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating pastebin:', error);
            alert('Failed to create pastebin. Please try again.');
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error encrypting save file:', error);
        alert('Failed to encrypt save file. Please try again.');
        this.isLoading = false;
      }
    });
  }

  private decryptSaveFile(data: string): void {
    this.isLoading = true;
    this.loadingMessage = 'Decrypting save file...';
    
    this.saveFileService.decryptSaveFile(data).subscribe({
      next: (response) => {
        this.saveData = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error decrypting save file:', error);
        alert('Failed to decrypt save file. Please check the file format and try again.');
        this.isLoading = false;
      }
    });
  }
}