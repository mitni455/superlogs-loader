/**
 * @requires files 
 */
const fs = require('fs');
const path = require('path');

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

/**
 * @test file storage 
 */
test('file-storage.actions.ts', ()=>{
    /**
     * @arrange
     */
    const files = {
        'file-storage.actions.ts': fs.readFileSync(path.resolve(__dirname, './mocks/file-storage.actions.txt'), 'utf8'),
        'file-storage.actions.converted.ts': fs.readFileSync(path.resolve(__dirname, './mocks/file-storage.actions.txt'), 'utf8'),
    };
    /**
     * @act 
     */
    const {txtUpdated} = findAllCommentModels(files['file-storage.actions.ts']);
    /**
     * @assert
     */
    expect(txtUpdated.trim()).toEqual('');
})
