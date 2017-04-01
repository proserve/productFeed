import "angular";
import "angular-mocks";
import "angular-ui-router";
import "angular-local-storage";
let testsContext = require.context('./', true, /\.js$/);
testsContext.keys().forEach(testsContext);
