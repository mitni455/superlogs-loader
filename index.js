/**
 * @requires findAllCommentModels
 */
const { findAllCommentModels } = require('./src');

/**
 * @requires WebPack
 */
const utils = require('loader-utils');

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

  console.log(`building ${fileName}`, {filePath, namespace});
  const header = `import {logger as superlogs} from 'superlogs';\nconst logs = superlogs('${namespace}')\n\n`;

  return header + txtUpdated;
}

function findFileNamespace(filePath) {
  try{
    const pathSplit = filePath.split('/');
    const fileName = pathSplit[pathSplit.length - 1];
    let fileSplit = fileName.split('.');
    fileSplit.pop();
    fileSplit = fileSplit.map(file => capitalize(file));
    const namespace = fileSplit.join('');
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
  const fileName = findFileNamespace(this._module.resource);

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
  const txtFileUpdated = performTransform(fileName, txtFileOriginal, options);

  return txtFileUpdated;
}
