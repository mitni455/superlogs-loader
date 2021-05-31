const txtFileOriginal = require('./txtFileOriginal');
const txtFileUpdated = require('./txtFileUpdated');

/**
 * Get File COntents helper
 * @param {string} fileNameRelativeToMocksFolder - file path relative to the mocks folder
 */
function getFileContents(fileNameRelativeToMocksFolder) {
    try{
        return fs.readFileSync(path.resolve(__dirname, `./${fileNameRelativeToMocksFolder}`), 'utf8');
    }
    catch(err){
        return false; 
    }
}

module.exports = {
    txtFileOriginal,
    txtFileUpdated,
    getFileContents,
}
