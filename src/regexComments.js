/**
 * @constant {RegexEnum} regex - the matchers to use for the doc comments
 */
 const regexComments = {
    check: /^.*@check\s+([^\n]*).*$/sgi,
    if: /^.*@if\s+([^\n]*).*$/sgi,
    elseIf: /^.*@elseIf\s+([^\n]*).*$/sgi,
    else: /^.*@else\s+([^\n]*).*$/sgi,
    desc: /^.*@desc\s+([^\n]*).*$/sgi,
    description: /^.*@description\s+([^\n]*).*$/sgi,
    note: /^.*@note\s+([^\n]*).*$/sgi,
    step: /^.*@step\s+([^\n]*).*$/sgi,
    data: /^.*@data\s+([^\n]*).*$/sgi,
    mongo: /^.*@mongo\s+([^\n]*).*$/sgi,
    fetch: /^.*@fetch\s+([^\n]*).*$/sgi,
    url: /^.*@url\s+([^\n]*).*$/sgi,
    event: /^.*@event\s+([^\n]*).*$/sgi,
    error: /^.*@error\s+([^\n]*).*$/sgi,
    throws: /^.*@throws\s+([^\n]*).*$/sgi,
    goto: /^.*@goto\s+([^\n]*).*$/sgi,
    loop: /^.*@loop\s+([^\n]*).*$/sgi,
    dispatch: /^.*@dispatch\s+([^\n]*).*$/sgi,
    function: /^.*@function\s+([^\n]*).*$/sgi,
    method: /^.*@method\s+([^\n]*).*$/sgi,
    class: /^.*@class\s+([^\n]*).*$/sgi,
    namespace: /^.*@namespace\s+([^\n]*).*$/sgi,
    try: /^.*@try\s+([^\n]*).*$/sgi,
    then: /^.*@then\s+([^\n]*).*$/sgi,
    catch: /^.*@catch\s+([^\n]*).*$/sgi,
    returns: /^.*@returns\s+([^\n]*).*$/sgi,
    args: /^.*@args\s+([^\n]*).*$/sgi,
    for: /^.*@for\s+([^\n]*).*$/sgi,
    forEach: /^.*@forEach\s+([^\n]*).*$/sgi,
    map: /^.*@map\s+([^\n]*).*$/sgi,
    forData: /^.*@forData\s+([^\n]*).*$/sgi,
};

module.exports = regexComments;
