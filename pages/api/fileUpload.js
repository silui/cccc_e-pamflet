import React from 'react';
import nextConnect from 'next-connect';
import multer from 'multer';

var theOne = null;

const upload = multer({
    storage: multer.memoryStorage()
})

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error.message);
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMAtch(req, res) {
      res.status(405).json({
          error: `Method '${req.method}' Not Allowed` })
  },
});

const uploadMiddleware = upload.single('theFile');

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  theOne = req.file.buffer
  res.status(200).json({data: 'success'});
});


apiRoute.get((req, res) => {
  res.status(200).json({pdfData: theOne});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
