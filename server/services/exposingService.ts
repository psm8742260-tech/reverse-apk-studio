import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';

const router = express.Router();

// 1. Ensure Persistent Public Directory Exists
const publicUploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(publicUploadDir)) {
  fs.mkdirSync(publicUploadDir, { recursive: true });
}

// 2. Multer Storage Engine Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB Limit
});

// 3. Unified Upload Endpoint for Exposing Engine & Exposing QR
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'నో ఫైల్ అప్లోడ్' });
    }

    // Determine domain & secure URL
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const publicUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    // Duration Logic from Frontend
    const duration = req.body.duration || 'Permanent'; 

    // Generate Dynamic QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(publicUrl, {
      errorCorrectionLevel: 'H',
      width: 300,
      margin: 2
    });

    return res.status(200).json({
      success: true,
      message: 'ఫైల్ విజయవంతంగా ప్రాసెస్ అయింది',
      url: publicUrl,
      qrCode: qrCodeDataUrl,
      duration: duration,
      fileInfo: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        filename: req.file.filename
      }
    });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Expiration Cleanup Logic (Background Task)
setInterval(() => {
  // Simple periodic check for temporary files if needed
}, 3600000); // Checks every hour

export default router;
