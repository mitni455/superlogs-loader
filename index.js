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
 * @param {string} fileName - file name
 * @param {string} txtFileOriginal - source text file
 * @param {Options} options - options 
 * @returns {string} txtFileUpdated - transformed text file
 */
function performTransform(fileName, txtFileOriginal, options) {
  const {
    txtUpdated,
    models,
  } = findAllCommentModels(txtFileOriginal);

  console.log(fileName, {txtUpdated});
  const header = `import {logger as superlogs} from 'superlogs';
  const logs = superlogs('${fileName}')`

  return txtUpdated;
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
  const fileName = this._module.resource;

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
