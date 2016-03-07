import {Router} from 'express';
import controller from './document-category.controller';
import {isAuthenticated} from '../../auth/auth.service';
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var router = new Router();

router.post('/', isAuthenticated(), controller.createNewDocumentCategory);
router.get('/', isAuthenticated(), controller.showDocumentCategories);

// router.put('/', isAuthenticated(), controller.updateDocumentCategories);
// router.put('/:categoryId', isAuthenticated(), controller.updateDocumentCategory);
// router.delete('/:categoryId', isAuthenticated(), controller.removeDocumentCategory);
//
// router.post('/:categoryId/file', isAuthenticated(), upload.single('file'), controller.saveDocumentCategoryFile);
// router.get('/:categoryId/file', isAuthenticated(), controller.getDocumentCategoryFile);
//
// router.post('/:categoryId/moveDocument/:newCategoryId', isAuthenticated(), controller.updateDocument);
//
// router.get('/unclassifiedCategory', isAuthenticated(), controller.getUnclassifiedCategory);
// router.get('/unclassifiedDocuments', isAuthenticated(), controller.getUnclassifiedDocuments);

router.post('/document-types', isAuthenticated(), controller.updateDocumentType);
router.get('/document-types', isAuthenticated(), controller.showUncategorizedDocumentTypes);

export default router;
