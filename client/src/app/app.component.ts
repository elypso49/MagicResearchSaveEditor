import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="header">
        <h1>Magic Research Save Editor</h1>
        <p>Load, edit, and export your game save files</p>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <p>&copy; 2023 Magic Research Save Editor</p>
      </footer>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .header h1 {
      margin-bottom: 10px;
      color: #333;
    }
    
    .header p {
      color: #666;
    }
    
    .footer {
      margin-top: 50px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class AppComponent {
  title = 'Magic Research Save Editor';
}