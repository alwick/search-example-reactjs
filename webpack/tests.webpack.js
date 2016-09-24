//make sure you have your directory and regex test set correctly!
var context = require.context('../src/client', true, /[\s\S]*Spec\.js$/);
context.keys().forEach(context);