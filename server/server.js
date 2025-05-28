const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../client/dist/client')));

// API Routes
const apiRouter = express.Router();

// Decrypt save file
apiRouter.post('/decrypt', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Use the decrypt function from the utility file
    const decrypted = await decrypt(data);
    res.json({ data: decrypted });
  } catch (error) {
    console.error('Error decrypting data:', error);
    res.status(500).json({ error: 'Failed to decrypt data' });
  }
});

// Encrypt save file
apiRouter.post('/encrypt', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Use the encrypt function from the utility file
    const encrypted = await encrypt(data);
    res.json({ data: encrypted });
  } catch (error) {
    console.error('Error encrypting data:', error);
    res.status(500).json({ error: 'Failed to encrypt data' });
  }
});

// Pastebin API integration
apiRouter.post('/pastebin/create', async (req, res) => {
  try {
    const { data, title } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // This is a simple implementation. In a real app, you'd want to use proper API keys
    // and handle authentication securely
    const response = await axios.post('https://pastebin.com/api/api_post.php', 
      new URLSearchParams({
        'api_dev_key': 'YOUR_API_KEY', // Replace with actual API key in production
        'api_option': 'paste',
        'api_paste_code': data,
        'api_paste_name': title || 'Save File',
        'api_paste_private': '0', // Public paste
        'api_paste_expire_date': '1W' // Expires in 1 week
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json({ url: response.data });
  } catch (error) {
    console.error('Error creating pastebin:', error);
    res.status(500).json({ error: 'Failed to create pastebin' });
  }
});

apiRouter.post('/pastebin/get', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }

    // Extract paste ID from URL
    const pasteId = url.split('/').pop();

    // Get raw paste content
    const response = await axios.get(`https://pastebin.com/raw/${pasteId}`);

    res.json({ data: response.data });
  } catch (error) {
    console.error('Error fetching pastebin:', error);
    res.status(500).json({ error: 'Failed to fetch pastebin' });
  }
});

// Register API routes
app.use('/api', apiRouter);

// Utility functions for encryption/decryption
const zlib = require('zlib');
const { Buffer } = require('buffer');

async function decrypt(data) {
  try {
    // First base64 decode
    const firstDecoded = Buffer.from(data, 'base64').toString();

    // Second base64 decode
    const secondDecoded = Buffer.from(firstDecoded, 'base64');

    // Decompress using gzip
    const decompressed = zlib.gunzipSync(secondDecoded);

    // Parse JSON
    return JSON.parse(decompressed.toString());
  } catch (error) {
    console.error('Error in decrypt function:', error);
    throw error;
  }
}

async function encrypt(data) {
  try {
    // Convert data to JSON string
    const jsonString = JSON.stringify(data);

    // Compress using gzip
    const compressed = zlib.gzipSync(Buffer.from(jsonString));

    // First base64 encode
    const firstEncoded = compressed.toString('base64');

    // Second base64 encode
    return Buffer.from(firstEncoded).toString('base64');
  } catch (error) {
    console.error('Error in encrypt function:', error);
    throw error;
  }
}

// Catch all other routes and return the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
