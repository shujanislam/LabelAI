const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

const { FileParser } = require('../utils/fileParser.js');
const { LabelData } = require('../utils/LabelData.js');

const uploadData = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ error: 'Failed to upload file.' });
    }

    try {
      const prompt = req.body.prompt;
      const fileBuffer = req.file.buffer;
      const text = await FileParser(fileBuffer);
  
      const OutputData = await LabelData(prompt, text);

      res.status(200).json({ output: OutputData });
    } catch (err) {
      console.error('Parse error:', err);
      res.status(500).json({ error: err.message });
    }
  });
};

module.exports = { uploadData };
