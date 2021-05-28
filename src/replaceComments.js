const replaceComment = (txtToUpdate, txtDocComment, txtMeta, txtMetaAdd) => txtToUpdate.replace(
    txtDocComment,
    `logs.${txtMetaAdd}('${txtMeta}');\n`
);
const replaceCheck = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addCheck');
const replaceIf = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addIf');
const replaceElseIf = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addElseIf');
const replaceElse = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addElse');
const replaceNamespace = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addNamespace');
const replaceMethod = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addMethod');
const replaceStep = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addStep');
const replaceGoto = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addGoTo');
const replaceFetch = (txtToUpdate, txtDocComment, txtDesc, txtUrl) => txtToUpdate.replace(
    txtDocComment,
    `logs.addFetch('${txtDesc}', ${txtUrl});\n`
);
const replaceUrl = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addUrl');
const replaceMongo = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addMongo');
const replaceEvent = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addEvent');
const replaceDispatch = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addDispatch');
const replaceLoop = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addLoop');
const replaceThrow = (txtToUpdate, txtDocComment, txtMeta) => replaceComment(txtToUpdate, txtDocComment, txtMeta, 'addThrows');
const replaceError = (txtToUpdate, txtDocComment, txtMeta) => txtToUpdate.replace(
    txtDocComment,
    `logs.addError('${txtMeta}');\n`
);
const replaceData = (txtToUpdate, txtDocComment, txtMeta) => txtToUpdate.replace(
    txtDocComment,
    `logs.addData('${txtMeta}');\n`
);

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
