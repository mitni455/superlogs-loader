/**
 * @requires replaceComments
 */
 const {
    // replaceComment,
    replaceCheck,
    replaceIf,
    replaceElseIf,
    replaceElse,
    replaceNamespace,
    replaceMethod,
    replaceStep,
    replaceGoto,
    replaceFetch,
    replaceMongo,
    replaceEvent,
    replaceDispatch,
    replaceLoop,
    replaceThrow,
    replaceError,
    replaceData,
    replaceSuccess,
    replaceFailed,
    replaceTry,
    replaceThen,
    replaceCatch,
    replaceReturns,
    replaceFor,
    replaceForEach,
    replaceMap,
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
    findSuccess,
    findFailed,
    findTry,
    findCatch,
    findReturns,
    findArgs,
    findFor,
    findForEach,
    findMap,
    findForData,
    findPayload,
} = require('./findComments');

module.exports = {
    /**
     * @requires replaceComments
     */
    // replaceComment,
    replaceCheck,
    replaceIf,
    replaceElseIf,
    replaceElse,
    replaceNamespace,
    replaceMethod,
    replaceStep,
    replaceGoto,
    replaceFetch,
    replaceMongo,
    replaceEvent,
    replaceDispatch,
    replaceLoop,
    replaceThrow,
    replaceError,
    replaceData,
    replaceSuccess,
    replaceFailed,
    replaceTry,
    replaceThen,
    replaceCatch,
    replaceReturns,
    replaceFor,
    replaceForEach,
    replaceMap,

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
    findSuccess,
    findFailed,
    findTry,
    findCatch,
    findReturns,
    findArgs,
    findFor,
    findForEach,
    findMap,
    findForData,

    /**
     * @requires findAllCommentModels
     */
    findAllComments,
    findAllCommentModels,
}
