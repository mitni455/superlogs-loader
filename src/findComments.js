/**
 * @requires regexComments
 */
const regexComments = require('./regexComments');

/**
 * @function findDocComment
 * @param {string} txtComment - comment text to find the regex expression
 * @param {RegexEnum} regexType - which regex expression should we match
 */
 function findDocComment(txtComment, regexType) {

    let logs = [];

    const regexStatement = regexComments[regexType];

    if(!regexStatement) throw new Error(`I could not find a regex statement for the key: @${regexType}`);

    let match = regexStatement.exec(txtComment);

    if (match !== null) {
        match.forEach((match, groupIndex) => {
            logs.push(match);
        });
    }

    /**
     * @desc if we have a match lets split into comment and statement
     */
    let model;
    if (logs.length > 1) {
        /**
         * @desc if you want the comment is [0] or [1] is the regex
         */
        model = logs[1].trim();
        return model;
    }
    else {
        return false;
    }
}
const findIfComment = txt => findDocComment(txt, 'if');
const findElseIfComment = txt => findDocComment(txt, 'elseIf');
const findElseComment = txt => findDocComment(txt, 'else');
const findCheckComment = txt => findDocComment(txt, 'check');
const findDescComment = txt => findDocComment(txt, 'desc');
const findDescriptionComment = txt => findDocComment(txt, 'description');
const findNoteComment = txt => findDocComment(txt, 'note');
const findStepComment = txt => findDocComment(txt, 'step');
const findDataComment = txt => findDocComment(txt, 'data');
const findMongoComment = txt => findDocComment(txt, 'mongo');
const findFetchComment = txt => findDocComment(txt, 'fetch');
const findUrlComment = txt => findDocComment(txt, 'url');
const findEventComment = txt => findDocComment(txt, 'event');
const findErrorComment = txt => findDocComment(txt, 'error');
const findThrowsComment = txt => findDocComment(txt, 'throws');
const findGotoComment = txt => findDocComment(txt, 'goto');
const findLoopComment = txt => findDocComment(txt, 'loop');
const findDispatchComment = txt => findDocComment(txt, 'dispatch');
const findFunctionComment = txt => findDocComment(txt, 'function');
const findMethodComment = txt => findDocComment(txt, 'method');
const findClassComment = txt => findDocComment(txt, 'class');
const findNamespaceComment = txt => findDocComment(txt, 'namespace');
const findSuccess = txt => findDocComment(txt, 'success');
const findFailed = txt => findDocComment(txt, 'failed');
const findTry = txt => findDocComment(txt, 'try');
const findThen = txt => findDocComment(txt, 'then');
const findCatch = txt => findDocComment(txt, 'catch');
const findReturns = txt => findDocComment(txt, 'returns');
const findDone = txt => findDocComment(txt, 'done');
const findArgs = txt => findDocComment(txt, 'args');
const findFor = txt => findDocComment(txt, 'for');
const findForEach = txt => findDocComment(txt, 'forEach');
const findMap = txt => findDocComment(txt, 'map');
const findForData = txt => findDocComment(txt, 'forData');
const findPayload = txt => findDocComment(txt, 'payload');

/**
 * @exports findComments
 */
module.exports = {
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
    findThen,
    findCatch,
    findReturns,
    findDone,
    findArgs,
    findFor,
    findForEach,
    findMap,
    findForData,
    findPayload,
};
