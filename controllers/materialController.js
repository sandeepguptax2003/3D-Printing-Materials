const Material = require('../models/Material');
const { bucket } = require('../config/firebaseConfig');

// GET all materials
exports.getAllMaterials = async (req, res, next) => {
  try {
    const materials = await Material.find().select('-imageUrl');
    res.status(200).json(materials);
  } catch (error) {
    next(error);
  }
};

// GET a specific material by ID
exports.getMaterialById = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    next(error);
  }
};

// POST a new material
exports.createMaterial = async (req, res, next) => {
  try {
    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Upload image to Firebase Storage
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (error) => {
      next(error);
    });

    stream.on('finish', async () => {
      // Get the public URL of the uploaded file
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      const newMaterial = new Material({
        name,
        technology,
        colors,
        pricePerGram,
        applicationTypes,
        imageUrl
      });

      await newMaterial.save();
      res.status(201).json(newMaterial);
    });

    stream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

// PUT update a material
exports.updateMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    const { name, technology, colors, pricePerGram, applicationTypes } = req.body;
    let updateData = { name, technology, colors, pricePerGram, applicationTypes };

    if (req.file) {
      // Delete the old image if it exists
      if (material.imageUrl) {
        const oldFileName = material.imageUrl.split('/').pop();
        try {
          await bucket.file(oldFileName).delete();
        } catch (deleteError) {
          console.error('Error deleting old file:', deleteError);
          // Continue with the update even if delete fails
        }
      }

      // Upload new image
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const file = bucket.file(fileName);
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      stream.on('error', (error) => {
        next(error);
      });

      stream.on('finish', async () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        updateData.imageUrl = imageUrl;

        const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedMaterial);
      });

      stream.end(req.file.buffer);
    } else {
      // If no new file is uploaded, update the other fields
      const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.status(200).json(updatedMaterial);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE a material
exports.deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Delete the associated image from Firebase Storage
    if (material.imageUrl) {
      const fileName = material.imageUrl.split('/').pop();
      try {
        await bucket.file(fileName).delete();
      } catch (deleteError) {
        console.error('Error deleting file:', deleteError);
        // Continue with the deletion of the material even if file delete fails
      }
    }

    await Material.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    next(error);
  }
};