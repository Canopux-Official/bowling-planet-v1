import multer from 'multer';

// Memory storage — files stay in RAM as a Buffer (req.file.buffer),
// which is exactly what uploadImage() in cloudinary.ts expects.
// Nothing gets written to disk, so no cleanup needed on our server.
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB cap — adjust as needed
});
