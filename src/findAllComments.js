/**
 * @requires regexComments
 */
const regexComments = require('./regexComments');

/**
 * @requires replaceComments
 */
const {
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
    replaceCatch,
    replaceReturns,
    replaceDone,
    replaceFor,
    replaceForEach,
    replaceMap,
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
        model.if = findIfComment(txtComment);
        model.elseIf = findElseIfComment(txtComment);
        model.else = findElseComment(txtComment);
        model.check = findCheckComment(txtComment);
        model.desc = findDescComment(txtComment);
        model.description = findDescriptionComment(txtComment);
        model.note = findNoteComment(txtComment);
        model.step = findStepComment(txtComment);
        model.data = findDataComment(txtComment);
        model.success = findSuccess(txtComment);
        model.failed = findFailed(txtComment);
        model.mongo = findMongoComment(txtComment);
        model.fetch = findFetchComment(txtComment);
        model.url = findUrlComment(txtComment);
        model.event = findEventComment(txtComment);
        model.error = findErrorComment(txtComment);
        model.throw = findThrowsComment(txtComment);
        model.goto = findGotoComment(txtComment);
        model.loop = findLoopComment(txtComment);
        model.dispatch = findDispatchComment(txtComment);
        model.function = findFunctionComment(txtComment);
        model.method = findMethodComment(txtComment);
        model.class = findClassComment(txtComment);
        model.namespace = findNamespaceComment(txtComment);
        model.try = findTry(txtComment);
        model.then = findThen(txtComment);
        model.catch = findCatch(txtComment);
        model.returns = findReturns(txtComment);
        model.done = findDone(txtComment);
        model.args = findArgs(txtComment);
        model.for = findFor(txtComment);
        model.forEach = findForEach(txtComment);
        model.map = findMap(txtComment);
        model.forData = findForData(txtComment);
        model.payload = findPayload(txtComment);

        /**
         * @payload
         */
        if(!model.payload){
            delete model.payload;
        }
        
        /**
         * @if
         */
        if (model.if) {
            txtUpdated = replaceIf(txtUpdated, txtComment, model.if);
        }
        else {
            delete model.if;
        }
        /**
         * @elseif
         */
        if (model.elseIf) {
            txtUpdated = replaceElseIf(txtUpdated, txtComment, model.elseIf);

        }
        else {
            delete model.elseIf;
        }
        /**
         * @else
         */
        if (model.else) {
            txtUpdated = replaceElse(txtUpdated, txtComment, model.else);

        }
        else {
            delete model.else;
        }
        /**
         * @check
         */
        if (model.check) {
            txtUpdated = replaceCheck(txtUpdated, txtComment, model.check);

        }
        else {
            delete model.check;
        }
        /**
         * @desc
         */
        if (model.desc) {

        }
        else {
            delete model.desc;
        }
        /**
         * @description
         */
        if (model.description) {

        }
        else {
            delete model.description;
        }
        /**
         * @note
         */
        if (model.note) {

        }
        else {
            delete model.note;
        }
        if (model.step) {
            txtUpdated = replaceStep(txtUpdated, txtComment, model.step);
        }
        else {
            delete model.step;
        }
        /**
         * @data
         */
        if (model.data) {
            txtUpdated = replaceData(txtUpdated, txtComment, model.data);
        }
        else {
            delete model.data;
        }
        /**
         * @success
         */
        if (model.success) {
            txtUpdated = replaceSuccess(txtUpdated, txtComment, model.success);
        }
        else {
            delete model.success;
        }
        /**
         * @failed
         */
        if (model.failed) {
            txtUpdated = replaceFailed(txtUpdated, txtComment, model.failed);
        }
        else {
            delete model.failed;
        }
        /**
         * @mongo
         */
        if (model.mongo) {
            txtUpdated = replaceMongo(txtUpdated, txtComment, model.mongo);
        }
        else {
            delete model.mongo;
        }
        /**
         * @fetch
         * @url
         */
        if (model.fetch && model.url) {
            txtUpdated = replaceFetch(txtUpdated, txtComment, model.fetch, model.url);            
        }
        else {
            delete model.fetch;
        }
        /**
         * @url
         */
        if (!model.url) {
            delete model.url;
        }
        /**
         * @event
         */
        if (model.event) {
            txtUpdated = replaceEvent(txtUpdated, txtComment, model.event);
        }
        else {
            delete model.event;
        }
        /**
         * @error
         */
        if (model.error) {
            txtUpdated = replaceError(txtUpdated, txtComment, model.error);
        }
        else {
            delete model.error;
        }
        /**
         * @throw
         */
        if (model.throw) {
            txtUpdated = replaceThrow(txtUpdated, txtComment, model.throw);
        }
        else {
            delete model.throw;
        }
        /**
         * @goto
         */
        if (model.goto) {
            txtUpdated = replaceGoto(txtUpdated, txtComment, model.goto);
        }
        else {
            delete model.goto;
        }
        /**
         * @loop
         */
        if (model.loop) {
            txtUpdated = replaceLoop(txtUpdated, txtComment, model.loop, model.desc || model.description, model.payload);
        }
        else {
            delete model.loop;
        }
        /**
         * @dispatch
         */
        if (model.dispatch) {
            txtUpdated = replaceDispatch(txtUpdated, txtComment, model.dispatch, model.payload);
        }
        else {
            delete model.dispatch;
        }
        /**
         * @function
         */
        if (model.function) {

        }
        else {
            delete model.function;
        }
        /**
         * @method
         */
        if (model.method) {
            txtUpdated = replaceMethod(
                txtUpdated, 
                txtComment, 
                model.method, 
                model.desc || model.description || false,
                model.args || false,
            );
        }
        else {
            delete model.method;
        }
        /**
         * @class
         */
        if (model.class) {

        }
        else {
            delete model.class;
        }
        /**
         * @namespace
         */
        if (model.namespace) {
            // txtUpdated = replaceNamespace(txtUpdated, txtComment, model.namespaces);
        }
        else {
            delete model.namespace;
        }
        /**
         * @findTry
         */
        if(model.try){
            txtUpdated = replaceTry(txtUpdated, txtComment, model.try);
        }
        else{
            delete model.try;
        }
        /**
         * @catch
         */
        if(model.catch){
            txtUpdated = replaceCatch(txtUpdated, txtComment, model.catch);
        }
        else{
            delete model.catch;
        }
        /**
         * @returns
         */
        if(model.returns){
            // txtUpdated = replaceReturns(txtUpdated, txtComment, model.returns);
        }
        else{
            delete model.returns;
        }
        /**
         * @done
         */
        if(model.done){
            txtUpdated = replaceDone(txtUpdated, txtComment, model.done);
        }
        else{
            delete model.done;
        }
        /**
         * @args
         */
        if(model.findArgs){
            txtUpdated = replaceArgs(txtUpdated, txtComment, model.args);
        }
        else{
            delete model.args;
        }
        /**
         * @for
         */
        if(model.for){
            txtUpdated = replaceFor(txtUpdated, txtComment, model.for);
        }
        else{
            delete model.for;
        }
        /**
         * @forEach
         */
        if(model.forEach){
            txtUpdated = replaceForEach(txtUpdated, txtComment, model.forEach);
        }
        else{
            delete model.forEach;
        }
        /**
         * @map
         */
        if(model.map){
            txtUpdated = replaceMap(txtUpdated, txtComment, model.map);
        }
        else{
            delete model.map;
        }
        /**
         * @forData
         */
        if(model.forData){
            // txtUpdated = replaceForData(txtUpdated, txtComment, model.forData);
        }
        else{
            delete model.forData;
        }

        /**
         * @constant isValid - check if all the model tags are false
         */
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
