const _replaceComment = (txtToUpdate, txtDocComment, description, txtMetaAdd) => {
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    return txtToUpdate.replace(
        txtDocComment,
        `logs.${txtMetaAdd}('${description}');\n`
    );
}

/**
 * @see addCheck(checkDesc, debugData)
 */
function replaceCheck(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    return _replaceComment(txtToUpdate, txtDocComment, description, 'addCheck');
}    

/**
 * @see addIf(description, val)
 */
function replaceIf(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    return _replaceComment(txtToUpdate, txtDocComment, description, 'addIf');
}    

/**
 * @see addElseIf(description, val)
 */
function replaceElseIf(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    return _replaceComment(txtToUpdate, txtDocComment, description, 'addElseIf');
}    

/**
 * @see addElse(description, val)
 */
function replaceElse(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    return _replaceComment(txtToUpdate, txtDocComment, description, 'addElse');
}    

/**
 * @see addNamespace(namespace)
 */
const replaceNamespace = (txtToUpdate, txtDocComment, description) => _replaceComment(txtToUpdate, txtDocComment, description, 'addNamespace');


/**
 * @see addMethod(methodName, methodDesc)
 */
function replaceMethod(txtToUpdate, txtDocComment, methodName, methodDesc, methodArgs){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!txtDocComment) throw new Error(`You must provide methodName for @method. methodName: ${methodName}`);

    let txtLog;
    if(methodDesc && methodArgs){
        txtLog = `logs.addMethod('${methodName}', '${methodDesc}', ${methodArgs});\n`;
    }
    else if(!methodDesc && methodArgs){
        txtLog = `logs.addMethod('${methodName}', '', ${methodArgs});\n`;
    }
    else{
        txtLog = `logs.addMethod('${methodName}');\n`;
    }

    /**
     * @step add default step 
     */
     txtLog = `logs.addStep('${methodDesc || methodName}');\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addStep(description)
 */
function replaceStep(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog = `logs.addStep('${description}');\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addGoto(method, namespace, isReturn)
 */
function replaceGoto(txtToUpdate, txtDocComment, method, namespace, isReturn){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!txtDocComment) throw new Error(`You must provide a methodname for @goto. method: ${method}`);
    
    let txtLogs;
    if(isReturn !== undefined){
        txtLogs = `logs.addGoto('${method}', '${namespace || ''}', ${isReturn});\n`;
    }
    else if(method && namespace){
        txtLogs = `logs.addGoto('${method}', '${namespace}');\n`;
    }
    else{
        txtLogs = `logs.addGoto('${method}');\n`;
    }
    return txtToUpdate.replace(
        txtDocComment,
        txtLogs,
    );
}

/**
 * @see addFetch(method, url, body, headers)
 */
function replaceFetch(txtToUpdate, txtDocComment, description, url, body, headers){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!url) throw new Error(`You must provide a URL for the fetch. @url: ${url}`);

    let txtLog;
    if(body && headers){
        txtLog = `logs.addFetch('${description}', '${url}', ${body}, ${headers});\n`
    }
    else if(body){
        txtLog = `logs.addFetch('${description}', '${url}', ${body});\n`
    }
    else if(headers){
        txtLog = `logs.addFetch('${description}', '${url}', ${headers});\n`
    }
    else{
        txtLog = `logs.addFetch('${description}', '${url}');\n`
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addMongo(description, debugData)
 */
function replaceMongo(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    return _replaceComment(txtToUpdate, txtDocComment, description, 'addMongo');
}

/**
 * @see addFireEvent(key, val, channel)
 */
function replaceEvent(txtToUpdate, txtDocComment, key, val, channel){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!txtDocComment) throw new Error(`You must provide a key to the @event. key: ${key}`);

    let txtLog;
    if(channel && val){
        txtLog = `logs.addEvent('${key}', ${val}, ${channel});\n`;
    }
    else if(!channel && val){
        txtLog = `logs.addEvent('${key}', ${val});\n`;
    }
    else{
        txtLog = `logs.addEvent('${key}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addDispatch(actionType, actionPayload)
 */
function replaceDispatch(txtToUpdate, txtDocComment, actionType, actionPayload){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    let txtLog;
    if(actionPayload){
        txtLog = `logs.addDispatch('${actionType}', ${actionPayload});\n`;
    }
    else{
        txtLog = `logs.addDispatch('${actionType}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addLoop(description, debugData, loopType = 'for')
 */
function replaceLoop(txtToUpdate, txtDocComment, description, debugData, loopType){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!txtDocComment) throw new Error(`You must provide a description for @loop. description: ${description}`);

    let txtLog;
    if(debugData){
        txtLog = `logs.addLoop('${description}', ${debugData}, ${loopType || 'for'});\n`;
    }
    else{
        txtLog = `logs.addLoop('${description}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addThrows(error, optionalDescription)
 */
function replaceThrow(txtToUpdate, txtDocComment, error, optionalDescription){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    let txtLog;
    if(optionalDescription){
        txtLog = `logs.addThrow(${error}, '${optionalDescription}');\n`;
    }
    else{
        txtLog = `logs.addThrow(${error});\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}
/**
 * @see addError(error, optionalDescription)
 */
function replaceError(txtToUpdate, txtDocComment, error, optionalDescription){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog;
    if(optionalDescription){
        txtLog = `logs.addError(${error}, '${optionalDescription}');\n`;
    }
    else{
        txtLog = `logs.addError(${error});\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addData(keyOrData, dataValIfKey, optionalFlag)
 */
function replaceData(txtToUpdate, txtDocComment, keyOrJson, val){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    let txtLog;
    if(val){
        txtLog = `logs.addData('${keyOrJson}', ${val});\n`
    }
    else{
        txtLog = `logs.addData({ '${keyOrJson}': ${keyOrJson} });\n`
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addSuccess(keyOrData, dataValIfKey)
 */
function replaceSuccess(txtToUpdate, txtDocComment, keyOrJson, val){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    let txtLog;
    if(val){
        txtLog = `logs.addSuccess('${keyOrJson}', ${val});\n`
    }
    else{
        txtLog = `logs.addSuccess({ '${keyOrJson}': ${keyOrJson} });\n`
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addFailed(keyOrData, dataValIfKey)
 */
function replaceFailed(txtToUpdate, txtDocComment, keyOrJson, val){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    let txtLog;
    if(val){
        txtLog = `logs.addFailed('${keyOrJson}', ${val});\n`
    }
    else{
        txtLog = `logs.addFailed({ '${keyOrJson}': ${keyOrJson} });\n`
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}


/**
 * @see addTry(description)
 */
 function replaceTry(txtToUpdate, txtDocComment, description){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog = `logs.addTry('${description}');\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}
/**
 * @see addThen(description, payload)
 */
function replaceThen(txtToUpdate, txtDocComment, description, payload){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog = `logs.addThen('${description}', ${payload});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}
/**
 * @see addCatch(description, catchPayload)
 */
function replaceCatch(txtToUpdate, txtDocComment, description, catchPayload){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog = `logs.addCatch('${description}', ${catchPayload});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}
/**
 * @see addReturns(payload)
 */
function replaceReturns(txtToUpdate, txtDocComment, payload){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog = `logs.addReturns(${payload});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}
/**
 * @see addDone(payload)
 */
function replaceDone(txtToUpdate, txtDocComment, payload){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog = `logs.addDone(${payload});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addFor(description, debugData)
 */
 function replaceFor(txtToUpdate, txtDocComment, description, debugData){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog;
    if(debugData){
        txtLog = `logs.addFor('${description}', ${debugData});\n`;
    }
    else{
        txtLog = `logs.addFor('${description}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addForeach(description, debugData)
 */
function replaceForEach(txtToUpdate, txtDocComment, description, debugData){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog;
    if(debugData){
        txtLog = `logs.addForeach('${description}', ${debugData});\n`;
    }
    else{
        txtLog = `logs.addForeach('${description}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addMap(description, debugData)
 */
function replaceMap(txtToUpdate, txtDocComment, description, debugData){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);

    let txtLog;
    if(debugData){
        txtLog = `logs.addMap('${description}', ${debugData});\n`;
    }
    else{
        txtLog = `logs.addMap('${description}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

module.exports = {
    //replaceComment: _replaceComment,
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
    replaceDone,
};
