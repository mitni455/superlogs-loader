/**
 * @requires findAllCommentModels
 */
const { findAllCommentModels } = require('./src');

/**
 * @requires WebPack
 */
const utils = require('loader-utils');

function printFileHeader(namespace) {
  let txtHeader = `import {logger as superlogs} from 'superlogs';\n`
      txtHeader += `const logs = superlogs('${namespace}')\n\n`;
  return txtHeader;
}

/**
 * 
 * @param {string} filePath - full path to file name
 * @param {string} txtFileOriginal - source text file
 * @param {Options} options - options 
 * @returns {string} txtFileUpdated - transformed text file
 */
function performTransform({fileName, namespace}, txtFileOriginal, options) {
  const {
    txtUpdated,
    models,
  } = findAllCommentModels(txtFileOriginal);

  console.log(`building ${fileName}`, {fileName, namespace});
  const header = printFileHeader(namespace);

  return header + txtUpdated;
}

function findFileNamespace(filePath) {
  try{
    const pathSplit = filePath.split('/');
    const fileName = (pathSplit[pathSplit.length - 1] === 'index.ts' || pathSplit[pathSplit.length - 1] === 'index.tsx') ? 
      pathSplit[pathSplit.length - 2] : 
      pathSplit[pathSplit.length - 1];
    let fileSplit = fileName.replace(new RegExp('-', 'g'),'.').split('.');
    fileSplit.pop();
    fileSplit = fileSplit.map(file => capitalize(file));
    const namespace = fileSplit.join('') === "''" ? fileName: fileSplit.join('');
    return {fileName, namespace};
  }
  catch(err){
    console.error('findFileNamespace failed', err.message);
    return {fileName:filePath, namespace:filePath};
  }
}
function capitalize(str) {
  var firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}

/**
 * Webpack loader 
 * @param {string} txtFileOriginal - original text file
 * @returns {string} txtFileUpdated - transformed text file
 */
module.exports = function (txtFileOriginal) {
  if (this.cacheable) {
    this.cacheable();
  }

  /**
   * @const {string} fileName - file name 
   */
  const fileNamespaceAndFilename = findFileNamespace(this._module.resource);

  /**
   * @step Get Options
   */
  const optionsConfig = this.options || this.query;
  const options =
    typeof optionsConfig === 'object' ?
      utils.getOptions(this) :
      utils.parseQuery(this.query);

  /**
   * @step Transform
   */
  const txtFileUpdated = performTransform(fileNamespaceAndFilename, txtFileOriginal, options);

  return txtFileUpdated;
}
