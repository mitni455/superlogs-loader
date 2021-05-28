/**
 * @requires replaceComments
 */
 const {
    replaceComment,
    replaceCheck,
    replaceIf,
    replaceElseIf,
    replaceElse,
    replaceNamespace,
    replaceMethod,
    replaceStep,
    replaceGoto,
    replaceFetch,
    replaceUrl,
    replaceMongo,
    replaceEvent,
    replaceDispatch,
    replaceLoop,
    replaceThrow,
    replaceError,
    replaceData,
} = require('./replaceComments');

/**
 * @requires findAllCommentModels
 */
const {
    findAllComments,
    findAllCommentModels,
} = require('./findAllComments');

/**
 * @exports findComments
 */
const {
    findIfComment,
    findElseIfComment,
    findElseComment,
    findCheckComment,
    findDescComment,
    findDescriptionComment,
    findNoteComment,
    findStepComment,
    findDataComment,
    findMongoComment,
    findFetchComment,
    findUrlComment,
    findEventComment,
    findErrorComment,
    findThrowsComment,
    findGotoComment,
    findLoopComment,
    findDispatchComment,
    findFunctionComment,
    findMethodComment,
    findClassComment,
    findNamespaceComment,
} = require('./findComments');

module.exports = {
    /**
     * @requires replaceComments
     */
    replaceComment,
    replaceCheck,
    replaceIf,
    replaceElseIf,
    replaceElse,
    replaceNamespace,
    replaceMethod,
    replaceStep,
    replaceGoto,
    replaceFetch,
    replaceUrl,
    replaceMongo,
    replaceEvent,
    replaceDispatch,
    replaceLoop,
    replaceThrow,
    replaceError,
    replaceData,

    /**
     * @requires findComments
     */
    findIfComment,
    findElseIfComment,
    findElseComment,
    findCheckComment,
    findDescComment,
    findDescriptionComment,
    findNoteComment,
    findStepComment,
    findDataComment,
    findMongoComment,
    findFetchComment,
    findUrlComment,
    findEventComment,
    findErrorComment,
    findThrowsComment,
    findGotoComment,
    findLoopComment,
    findDispatchComment,
    findFunctionComment,
    findMethodComment,
    findClassComment,
    findNamespaceComment,

    /**
     * @requires findAllCommentModels
     */
    findAllComments,
    findAllCommentModels,
}
