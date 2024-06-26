const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const errorHandler = require('../utils/errorHandler');

// GET all materials
router.get('/', materialController.getAllMaterials);

// GET a specific material by ID
router.get('/:id', materialController.getMaterialById);

// POST a new material
router.post('/', uploadMiddleware, materialController.createMaterial);

// PUT update a material
router.put('/:id', uploadMiddleware, materialController.updateMaterial);

// DELETE a material
router.delete('/:id', materialController.deleteMaterial);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
