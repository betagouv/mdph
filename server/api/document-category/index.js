import {Router} from 'express';
import * as controller from './document-category.controller';
import multer from 'multer';

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var router = new Router();

router.post('/', controller.createNewDocumentCategory);
router.get('/', controller.showDocumentCategories);

router.get('/unclassifiedCategory', controller.getUnclassifiedCategory);

router.post('/document-types', controller.updateDocumentType);
router.get('/document-types', controller.showUncategorizedDocumentTypes);

router.post('/:categoryId/file', upload.single('file'), controller.saveDocumentCategoryFile);
router.get('/:categoryId/file', controller.getDocumentCategoryFile);

//router.put('/', isAuthenticated(), controller.updateDocumentCategories);

// router.put('/:categoryId', isAuthenticated(), controller.updateDocumentCategory);
// router.delete('/:categoryId', isAuthenticated(), controller.removeDocumentCategory);
//

// router.post('/:categoryId/moveDocument/:newCategoryId', isAuthenticated(), controller.updateDocument);

export default router;
