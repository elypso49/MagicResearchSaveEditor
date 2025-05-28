import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SaveEditorComponent } from './components/save-editor/save-editor.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PastebinInputComponent } from './components/pastebin-input/pastebin-input.component';
import { JsonEditorComponent } from './components/json-editor/json-editor.component';
import { ExportOptionsComponent } from './components/export-options/export-options.component';

import { SaveFileService } from './services/save-file.service';
import { PastebinService } from './services/pastebin.service';

const routes: Routes = [
  { path: '', component: SaveEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    SaveEditorComponent,
    FileUploadComponent,
    PastebinInputComponent,
    JsonEditorComponent,
    ExportOptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SaveFileService,
    PastebinService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }