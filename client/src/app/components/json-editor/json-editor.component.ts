import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { JSONEditor } from 'vanilla-jsoneditor';

@Component({
  selector: 'app-json-editor',
  template: `
    <div class="json-editor-container">
      <div #jsonEditorContainer class="json-editor"></div>
    </div>
  `,
  styles: [`
    .json-editor-container {
      width: 100%;
      height: 500px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .json-editor {
      width: 100%;
      height: 100%;
    }
  `]
})
export class JsonEditorComponent implements OnChanges, OnDestroy {
  @Input() data: any;
  @Output() dataChanged = new EventEmitter<any>();
  @ViewChild('jsonEditorContainer', { static: true }) jsonEditorContainer!: ElementRef;
  
  private editor: any;
  
  ngAfterViewInit() {
    this.initEditor();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.editor) {
      this.updateEditorContent();
    }
  }
  
  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
  
  private initEditor() {
    const content = {
      json: this.data || {}
    };
    
    this.editor = new JSONEditor({
      target: this.jsonEditorContainer.nativeElement,
      props: {
        content,
        onChange: (updatedContent: any) => {
          if (updatedContent.json) {
            this.dataChanged.emit(updatedContent.json);
          }
        }
      }
    });
  }
  
  private updateEditorContent() {
    if (this.editor) {
      this.editor.update({
        json: this.data
      });
    }
  }
}