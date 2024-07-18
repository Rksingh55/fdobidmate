import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error in API route:', error);
    res.status(501).json({ error: `Sorry something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.array('files'));

apiRoute.post((req, res) => {
  try {
    console.log('Received files:', req.files); // Log received files
    if (!req.files || req.files.length === 0) {
      throw new Error('No files uploaded');
    }
    // Respond with the uploaded files information
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, since multer will handle it
  },
};

export default apiRoute;
