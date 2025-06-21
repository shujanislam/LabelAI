const FileParser = async (fileBuffer) => {
  return fileBuffer.toString('utf-8');
};

module.exports = { FileParser };
