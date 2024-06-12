import express from 'express';
import { deleteBook, fetchBook, getAllBook, saveBook, searchBook, updateBook } from '../controllers/bookController';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/Users/user2/Developer/IJSE-MERN-Book-Store/book_catalog_ui/public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage:storage });

const route = express.Router();


route.get('/', getAllBook);
route.get('/:book_name', searchBook);
route.get('/details/:bid', fetchBook);
route.post('/',upload.single('book_image'), saveBook);
route.put('/', updateBook);
route.delete('/:id', deleteBook);

export default route;
