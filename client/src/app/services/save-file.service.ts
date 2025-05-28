import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Decrypt a save file
   * @param data The encrypted save file data
   * @returns Observable with the decrypted JSON data
   */
  decryptSaveFile(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decrypt`, { data });
  }

  /**
   * Encrypt a save file
   * @param data The JSON data to encrypt
   * @returns Observable with the encrypted save file data
   */
  encryptSaveFile(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/encrypt`, { data });
  }

  /**
   * Read a file from the file system
   * @param file The file to read
   * @returns Promise with the file contents as a string
   */
  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  }

  /**
   * Download a file
   * @param data The data to download
   * @param filename The name of the file
   */
  downloadFile(data: string, filename: string = 'saveFile'): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}