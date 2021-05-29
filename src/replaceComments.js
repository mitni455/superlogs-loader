const _replaceComment = (txtToUpdate, txtDocComment, description, txtMetaAdd) => txtToUpdate.replace(
    txtDocComment,
    `logs.${txtMetaAdd}('${description}');\n`
);

/**
 * @see addCheck(checkDesc, debugData)
 */
function replaceCheck(txtToUpdate, txtDocComment, description){
    return _replaceComment(txtToUpdate, txtDocComment, description, 'addCheck');
}    

/**
 * @see addIf(description, val)
 */
function replaceIf(txtToUpdate, txtDocComment, description){
    return _replaceComment(txtToUpdate, txtDocComment, description, 'addIf');
}    

/**
 * @see addElseIf(description, val)
 */
function replaceElseIf(txtToUpdate, txtDocComment, description){
    return _replaceComment(txtToUpdate, txtDocComment, description, 'addElseIf');
}    

/**
 * @see addElse(description, val)
 */
function replaceElse(txtToUpdate, txtDocComment, description){
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
    let txtLog = `logs.addMethod('${methodName}', '${methodDesc}', ${methodArgs});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addStep(description)
 */
function replaceStep(txtToUpdate, txtDocComment, description){
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
    
    let txtLogs;
    if(isReturn === undefined){
        txtLogs = `logs.addGoto('${method}', '${namespace}', ${isReturn});\n`;
    }
    else{
        txtLogs = `logs.addGoto('${method}', '${namespace}');\n`;
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

    txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addMongo(description, debugData)
 */
function replaceMongo(txtToUpdate, txtDocComment, description){
    return _replaceComment(txtToUpdate, txtDocComment, description, 'addMongo');
}

/**
 * @see addFireEvent(key, val, channel)
 */
function replaceEvent(txtToUpdate, txtDocComment, key, val, channel){
    let txtLog;
    if(channel){
        txtLog = `logs.addEvent('${key}', ${val}, ${channel});\n`;
    }
    else{
        txtLog = `logs.addEvent('${key}', ${val});\n`;
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
 * @see addData(keyOrData, dataValIfKey, optionalFlag)
 */
function replaceData(txtToUpdate, txtDocComment, keyOrJson, val){
    
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
    let txtLog = `logs.addCatch('${description}', ${catchPayload});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}
/**
 * @see addReturns(payload)
 */
function replaceReturns(txtToUpdate, txtDocComment, catchPayload){
    let txtLog = `logs.addReturns('${description}', ${catchPayload});\n`;

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

/**
 * @see addFor(description, debugData)
 */
 function replaceFor(txtToUpdate, txtDocComment, description, debugData){
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
};
