/**
 * @requires regexComments
 */
const regexComments = require('./regexComments');

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

/**
* @function findAllComments
* @param {string} txtToCheck - text to find the comments in 
*/
function findAllComments(txtToCheck) {
    /**
     * @returns docComments - array of all the comments found
     */
    let docComments = [];

    /**
     * @constant regex - regex pattern to find doc comment blocks
     */
    const regexToFindAllCommentBlocks = /\/\*\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm;

    /**
     * @step loop through finding comments
     */
    let match;
    while ((match = regexToFindAllCommentBlocks.exec(txtToCheck)) !== null) {
        /** 
         * @desc This is necessary to avoid infinite loops with zero-width matches
         */
        if (match.index === regexToFindAllCommentBlocks.lastIndex) {
            regexToFindAllCommentBlocks.lastIndex++;
        }

        /**
         * @desc add the first match to the doc comments array
         */
        docComments.push(match[0]);
    }

    /**
     * @returns docComments - array of all the comments found
     */
    return docComments;
}
function findAllCommentModels(txtToParse) {
    /**
     * @return 
         docCommentsModels - comment models 
         txtUpdated - updated text with replacements
     */
    let docCommentsModels = [];
    let txtUpdated = txtToParse;

    /**
     * @const docComments - find all doc comments 
     */
    const docComments = findAllComments(txtToParse);

    /**
     * @loop parse all doc comments
     */
    docCommentsModels = docComments.map((txtComment, index) => {

        let model = {}
        model.ifs = findIfComment(txtComment);
        model.elseIfs = findElseIfComment(txtComment);
        model.elses = findElseComment(txtComment);
        model.checks = findCheckComment(txtComment);
        model.descs = findDescComment(txtComment);
        model.descriptions = findDescriptionComment(txtComment);
        model.notes = findNoteComment(txtComment);
        model.steps = findStepComment(txtComment);
        model.datas = findDataComment(txtComment);
        model.mongos = findMongoComment(txtComment);
        model.fetchs = findFetchComment(txtComment);
        model.urls = findUrlComment(txtComment);
        model.events = findEventComment(txtComment);
        model.errors = findErrorComment(txtComment);
        model.throws = findThrowsComment(txtComment);
        model.gotos = findGotoComment(txtComment);
        model.loops = findLoopComment(txtComment);
        model.dispatchs = findDispatchComment(txtComment);
        model.functions = findFunctionComment(txtComment);
        model.methods = findMethodComment(txtComment);
        model.classes = findClassComment(txtComment);
        model.namespaces = findNamespaceComment(txtComment);


        if (model.ifs) {
            txtUpdated = replaceIf(txtUpdated, txtComment, model.ifs);
        }
        else {
            delete model.ifs;
        }
        if (model.elseIfs) {
            txtUpdated = replaceElseIf(txtUpdated, txtComment, model.elseIfs);

        }
        else {
            delete model.elseIfs;
        }
        if (model.elses) {
            txtUpdated = replaceElse(txtUpdated, txtComment, model.elses);

        }
        else {
            delete model.elses;
        }
        if (model.checks) {
            txtUpdated = replaceCheck(txtUpdated, txtComment, model.checks);

        }
        else {
            delete model.checks;
        }
        if (model.descs) {

        }
        else {
            delete model.descs;
        }
        if (model.descriptions) {

        }
        else {
            delete model.descriptions;
        }
        if (model.notes) {

        }
        else {
            delete model.notes;
        }
        if (model.steps) {
            txtUpdated = replaceStep(txtUpdated, txtComment, model.steps);
        }
        else {
            delete model.steps;
        }
        if (model.datas) {
            txtUpdated = replaceData(txtUpdated, txtComment, model.datas);
        }
        else {
            delete model.datas;
        }
        if (model.mongos) {
            txtUpdated = replaceMongo(txtUpdated, txtComment, model.mongos);
        }
        else {
            delete model.mongos;
        }
        if (model.fetchs && model.urls) {
            txtUpdated = replaceFetch(txtUpdated, txtComment, model.fetchs, model.urls);
        }
        else {
            delete model.fetchs;
        }
        if (!model.urls) {
            delete model.urls;
        }
        if (model.events) {
            txtUpdated = replaceEvent(txtUpdated, txtComment, model.events);
        }
        else {
            delete model.events;
        }
        if (model.errors) {
            txtUpdated = replaceError(txtUpdated, txtComment, model.errors);
        }
        else {
            delete model.errors;
        }
        if (model.throws) {
            txtUpdated = replaceThrow(txtUpdated, txtComment, model.throws);
        }
        else {
            delete model.throws;
        }
        if (model.gotos) {
            txtUpdated = replaceGoto(txtUpdated, txtComment, model.gotos);
        }
        else {
            delete model.gotos;
        }
        if (model.loops) {
            txtUpdated = replaceLoop(txtUpdated, txtComment, model.loop);
        }
        else {
            delete model.loops;
        }
        if (model.dispatchs) {
            txtUpdated = replaceDispatch(txtUpdated, txtComment, model.dispatch);
        }
        else {
            delete model.dispatchs;
        }
        if (model.functions) {

        }
        else {
            delete model.functions;
        }
        if (model.methods) {
            txtUpdated = replaceMethod(txtUpdated, txtComment, model.methods);
        }
        else {
            delete model.methods;
        }
        if (model.classes) {

        }
        else {
            delete model.classes;
        }
        if (model.namespaces) {
            txtUpdated = replaceNamespace(txtUpdated, txtComment, model.namespaces);
        }
        else {
            delete model.namespaces;
        }

        const isValid = !!Object.values(model).find(m => m !== false);

        return isValid ? model : false;
    });

    /**
     * @constant docCommentsModels - comment models 
     */
    return {
        txtUpdated,
        models: docCommentsModels.filter(model => model !== false),
    };
}

module.exports = {
    findAllComments,
    findAllCommentModels,
}
