import * as express from 'express';
import * as storyController from '../controllers/storyController';

const router = express.Router();

router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStory);
router.post('/', storyController.createStory);
router.put('/:id', storyController.updateStory);
router.delete('/:id', storyController.deleteStory);

export default router;
