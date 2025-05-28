import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-export-options',
  template: `
    <div class="export-options">
      <div class="export-buttons">
        <button 
          class="export-button file-button" 
          (click)="onExportToFile()">
          <span class="icon">💾</span>
          Export to File
        </button>
        
        <button 
          class="export-button pastebin-button" 
          (click)="onExportToPastebin()">
          <span class="icon">📋</span>
          Export to Pastebin
        </button>
      </div>
      
      <div class="export-info">
        <p>
          <strong>Export to File:</strong> Download the save file to your computer.
        </p>
        <p>
          <strong>Export to Pastebin:</strong> Create a pastebin with your save file data that you can share with others.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .export-options {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .export-buttons {
      display: flex;
      gap: 15px;
    }
    
    .export-button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.1s;
    }
    
    .export-button:hover {
      transform: translateY(-2px);
    }
    
    .export-button:active {
      transform: translateY(0);
    }
    
    .file-button {
      background-color: #28a745;
      color: white;
    }
    
    .file-button:hover {
      background-color: #218838;
    }
    
    .pastebin-button {
      background-color: #17a2b8;
      color: white;
    }
    
    .pastebin-button:hover {
      background-color: #138496;
    }
    
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    
    .export-info {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .export-info p {
      margin: 0 0 10px 0;
    }
    
    .export-info p:last-child {
      margin-bottom: 0;
    }
  `]
})
export class ExportOptionsComponent {
  @Input() data: any;
  @Output() exportToFile = new EventEmitter<void>();
  @Output() exportToPastebin = new EventEmitter<void>();
  
  onExportToFile(): void {
    this.exportToFile.emit();
  }
  
  onExportToPastebin(): void {
    this.exportToPastebin.emit();
  }
}