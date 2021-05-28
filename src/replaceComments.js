const replaceComment = (txtToUpdate, txtDocComment, description, txtMetaAdd) => txtToUpdate.replace(
    txtDocComment,
    `logs.${txtMetaAdd}('${description}');\n`
);
const replaceCheck = (txtToUpdate, txtDocComment, description) => replaceComment(txtToUpdate, txtDocComment, description, 'addCheck');
const replaceIf = (txtToUpdate, txtDocComment, description) => replaceComment(txtToUpdate, txtDocComment, description, 'addIf');
const replaceElseIf = (txtToUpdate, txtDocComment, description) => replaceComment(txtToUpdate, txtDocComment, description, 'addElseIf');
const replaceElse = (txtToUpdate, txtDocComment, description) => replaceComment(txtToUpdate, txtDocComment, description, 'addElse');
const replaceNamespace = (txtToUpdate, txtDocComment, description) => replaceComment(txtToUpdate, txtDocComment, description, 'addNamespace');


/**
 * @see addMethod(methodName, methodDesc)
 */
function replaceMethod(txtToUpdate, txtDocComment, methodName, methodDesc){
    let txtLog = `logs.addMethod('${methodName}', '${methodDesc}');\n`;

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
    return replaceComment(txtToUpdate, txtDocComment, description, 'addMongo');
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
        txtLog = `logs.addData('${key}', ${val});\n`
    }
    else{
        txtLog = `logs.addData({ ${keyOrJson} });\n`
    }

    return txtToUpdate.replace(
        txtDocComment,
        txtLog
    );
}

module.exports = {
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
};
