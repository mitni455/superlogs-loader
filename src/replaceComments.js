const _replaceComment = (txtToUpdate, txtDocComment, description, txtMetaAdd) => {
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    
    return txtToUpdate.replace(
        txtDocComment,
        `log.${txtMetaAdd}('${description}');\n`
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
 * 
 */
function replaceMethodArgs(argsAsCommaSeperatedList) {
    try{
        let args = argsAsCommaSeperatedList.split(',');
        args = args.map(arg => {
            const key = arg.trim();
            return `'${key}': ${key}`; 
        }).join(',');
        return `{ ${args} }`;
    }
    catch(err){
        return err.message;
    }
}

/**
 * @see addMethod(methodName, methodDesc)
 */
function replaceMethod(txtToUpdate, txtDocComment, methodName, methodDesc, methodArgs){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!txtDocComment) throw new Error(`You must provide methodName for @method. methodName: ${methodName}`);

    let txtLog;
    if(methodDesc && methodArgs){
        txtLog = `const log = logs.addMethod(\`${methodName}\`, '${methodDesc}', ${replaceMethodArgs(methodArgs)});\n`;
    }
    else if(!methodDesc && methodArgs){
        txtLog = `const log = logs.addMethod(\`${methodName}\`, '', ${replaceMethodArgs(methodArgs)});\n`;
    }
    else if(methodDesc && !methodArgs){
        txtLog = `const log = logs.addMethod(\`${methodName}\`, \`${methodDesc}\`);\n`;
    }
    else{
        txtLog = `const log = logs.addMethod(\`${methodName}\`);\n`;
    }
    txtLog += `\nconst loggerMethodName = ${methodName};\n`;

    /**
     * @step add default step 
     */
     txtLog += `log.addStep(\`${methodDesc || methodName}\`);\n`;

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

    const stepDesc = description;
    const stepName = description; 
    const cat = 'block'; 
    const optionalMethodName = 'loggerMethodName';
    let txtLog = `log.addStep(\`${stepDesc}\`, \`${stepName}\`, \`${cat}\`, ${optionalMethodName});\n`;

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
        txtLogs = `log.addGoto('${method}', '${namespace || ''}', ${isReturn});\n`;
    }
    else if(method && namespace){
        txtLogs = `log.addGoto('${method}', '${namespace}');\n`;
    }
    else{
        txtLogs = `log.addGoto('${method}');\n`;
    }
    return txtToUpdate.replace(
        txtDocComment,
        txtLogs,
    );
}

/**
 * @see addFetch(method, url, body, headers)
 */
function replaceFetch(
    txtToUpdate, 
    txtDocComment, 
    description, 
    url, 
    body, 
    headers
){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!url) throw new Error(`You must provide a URL for the fetch. @url: ${url}`);

    let txtLog;
    if(body && headers){
        txtLog = `log.addFetch('${description}', '${url}', ${body}, ${headers});\n`
    }
    else if(body){
        txtLog = `log.addFetch('${description}', '${url}', ${body});\n`
    }
    else if(headers){
        txtLog = `log.addFetch('${description}', '${url}', ${headers});\n`
    }
    else{
        txtLog = `log.addFetch('${description}', '${url}');\n`
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
        txtLog = `log.addEvent('${key}', ${val}, ${channel});\n`;
    }
    else if(!channel && val){
        txtLog = `log.addEvent('${key}', ${val});\n`;
    }
    else{
        txtLog = `log.addEvent('${key}');\n`;
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog    
    );
}

/**
 * @see addDispatch(actionType, actionPayload)
 */
function replaceDispatch(txtToUpdate, txtDocComment, actionType, actionPayload, actionLifecycle){
    if(!txtToUpdate) throw new Error(`You must provide text to update. txtToUpdate: ${txtToUpdate}`);
    if(!txtDocComment) throw new Error(`You must provide doc comment. txtDocComment: ${txtDocComment}`);
    if(!actionType) throw new Error(`You must provide an @dispath action tyoe. actionType: ${actionType}`);
    
    let txtLog;
    if(actionPayload && actionLifecycle){
        txtLog = `log.addDispatch('${actionType}', ${actionPayload}, ${actionLifecycle});\n`;
    }
    else if(!actionPayload && actionLifecycle){
        txtLog = `log.addDispatch('${actionType}', false, ${actionLifecycle});\n`;
    }
    else if(actionPayload){
        txtLog = `log.addDispatch('${actionType}', ${actionPayload});\n`;
    }
    else{
        txtLog = `log.addDispatch('${actionType}');\n`;
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
        txtLog = `log.addLoop('${description}', ${debugData}, ${loopType || 'for'});\n`;
    }
    else{
        txtLog = `log.addLoop('${description}');\n`;
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
        txtLog = `log.addThrow(${error}, '${optionalDescription}');\n`;
    }
    else{
        txtLog = `log.addThrow(${error});\n`;
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
        txtLog = `log.addError(${error}, '${optionalDescription}');\n`;
    }
    else{
        txtLog = `log.addError(${error});\n`;
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
        txtLog = `log.addData('${keyOrJson}', ${val});\n`
    }
    else{
        txtLog = `log.addData({ '${keyOrJson}': ${keyOrJson} });\n`
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
        txtLog = `log.addSuccess('${keyOrJson}', ${val});\n`
    }
    else{
        txtLog = `log.addSuccess({ '${keyOrJson}': ${keyOrJson} });\n`
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
        txtLog = `log.addFailed('${keyOrJson}', ${val});\n`
    }
    else{
        txtLog = `log.addFailed({ '${keyOrJson}': ${keyOrJson} });\n`
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

    let txtLog = `log.addTry('${description}');\n`;

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

    let txtLog = `log.addThen('${description}', ${payload});\n`;

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

    let txtLog;
    if(catchPayload){
        txtLog = `log.addCatch('${description}', ${catchPayload});\n`;
    }
    else{
        txtLog = `log.addCatch('${description}');\n`;
    }

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

    let txtLog = `log.addReturns(${payload});\n`;

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

    let txtLog = `log.addDone(${payload});\n`;

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
        txtLog = `log.addFor('${description}', ${debugData});\n`;
    }
    else{
        txtLog = `log.addFor('${description}');\n`;
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
        txtLog = `log.addForeach('${description}', ${debugData});\n`;
    }
    else{
        txtLog = `log.addForeach('${description}');\n`;
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
        txtLog = `log.addMap('${description}', ${debugData});\n`;
    }
    else{
        txtLog = `log.addMap('${description}');\n`;
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
