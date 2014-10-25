exports.printLog = function printLog(functionName, message) {
    functionName = typeof functionName !== 'undefined' ? functionName : 'NoName';
    message = typeof message !== 'undefined' ? message : 'NoMessage';
    console.log('Function: ' + functionName);
    console.log('Message: ' + message + '\n');

}