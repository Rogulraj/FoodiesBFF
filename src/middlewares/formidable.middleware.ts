import { RequestWithFormData } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

import formidable from 'formidable';

export const FormidableMiddleware = async (req: RequestWithFormData, res: Response, next: NextFunction) => {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      // Parse form data
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ message: 'Error processing form data' });
      }

      const name = fields.name;
      const menuType = fields.menuType;
      const imageUrl = files.imageUrl; // Assuming a single file input named "file"

      req.body.name = name;
      req.body.menuType = menuType;
      req.body.imageUrl = JSON.stringify(imageUrl);

      next();

      // Forward data to core server (replace with your actual logic)
      // const coreServerResponse = await axios.post('http://your-core-server-url', { name, file });

      // Handle success based on core server response
      // res.json({ message: 'Form data received and forwarded successfully' });
    });
  } catch (error) {
    next(error);
  }
};
