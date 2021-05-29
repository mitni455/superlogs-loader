/**
 * @requires findAllCommentModels
 */
 const {
    findAllComments,
    findAllCommentModels,
} = require('./findAllComments');

/**
 * @requires mocks
 */
const {
    txtFileOriginal,
    txtFileUpdated,
} = require('./mocks');

/**
 * @test findAllComments
 */
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

/**
 * @test findAllCommentModels
 */
test('#findAllCommentModels should be updated', () => {
    const {txtUpdated} = findAllCommentModels(txtFileOriginal);
    expect(txtUpdated.trim()).toEqual(txtFileUpdated.trim());
    // console.log(txtFileUpdated.trim());
});
