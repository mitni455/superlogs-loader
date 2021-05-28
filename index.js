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
 * @param {string} txtFileOriginal - source text file
 * @param {Options} options - options 
 * @returns {string} txtFileUpdated - transformed text file
 */
function performTransform(txtFileOriginal, options) {
  const {
    txtUpdated,
    models,
  } = findAllCommentModels(txtFileOriginal);
  return txtUpdated;
}

/**
 * Webpack loader 
 * @param {string} txtFileOriginal - original text file
 * @returns {string} txtFileUpdated - transformed text file
 */
module.exports = function (txtFileOriginal) {
  if (this.cacheable) {
    this.cacheable()
  }

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
  const txtFileUpdated = performTransform(txtFileOriginal, options);

  return txtFileUpdated;
}
