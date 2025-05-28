# Magic Research Save Editor

A Node.js and Angular application for loading, editing, and exporting game save files.

## Features

- Load save files from your computer or from a pastebin URL
- Edit save file variables using a JSON editor
- Export modified save files to your computer or to pastebin
- Secure encryption and decryption of save files

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MagicResearchSaveEditor.git
   cd MagicResearchSaveEditor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Usage

### Loading a Save File

1. Click on "From File" tab and select your save file
2. Click "Load Save File" to decrypt and load the file
3. Alternatively, use the "From Pastebin" tab to load a save file from a pastebin URL

### Editing the Save File

1. Use the JSON editor to modify the values in your save file
2. All changes are automatically saved in memory

### Exporting the Save File

1. Click "Export to File" to download the modified save file to your computer
2. Or click "Export to Pastebin" to create a pastebin with your save file data

## Development

### Project Structure

- `/server` - Node.js backend API
- `/client` - Angular frontend application
- `/examples` - Example save files and original code

### Running in Development Mode

- Backend only: `npm run dev:server`
- Frontend only: `npm run dev:client`
- Both: `npm run dev`

### Building for Production

```
npm run build:client
npm start
```

## License

This project is licensed under the ISC License.
