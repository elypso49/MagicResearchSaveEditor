import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastebinService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Create a new pastebin with the provided data
   * @param data The data to upload to pastebin
   * @param title Optional title for the pastebin
   * @returns Observable with the URL of the created pastebin
   */
  createPastebin(data: string, title?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pastebin/create`, { data, title });
  }

  /**
   * Get data from a pastebin URL
   * @param url The pastebin URL to fetch data from
   * @returns Observable with the data from the pastebin
   */
  getPastebin(url: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pastebin/get`, { url });
  }

  /**
   * Validate if a string is a valid pastebin URL
   * @param url The URL to validate
   * @returns boolean indicating if the URL is valid
   */
  isValidPastebinUrl(url: string): boolean {
    // Simple validation - check if it's a pastebin.com URL
    return url.startsWith('https://pastebin.com/') || url.startsWith('http://pastebin.com/');
  }
}