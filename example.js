/**
 * @requires findAllCommentModels
 */
const { findAllCommentModels } = require('./src');

const txtFileOriginal = require('./src/mocks/txtFileOriginal');

const {
    txtUpdated,
    models,
} = findAllCommentModels(txtFileOriginal);

console.log(txtUpdated);
