# ElectronUrlOpener
Provides a helper class for dealing with the `open-url` event within Electron apps.

Was helpful to have this decoupled from general app logic because it requires checking for the app being ready, listening for the `will-finish-launching`, and one or two other annoying things.


## Sample Usage:
``` javascript
var urlOpener = require('./vendors/electron-url-opener/index.js');
urlOpener.init(function(url) {
    console.log(url);// eg. protocol://path/subpath/file.extension
});
```
