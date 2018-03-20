# gulp-autopatch
### A gulp plugin for monitoring and automatically re-publishing and semver incrementing npm packages/modules.
<!-- ```
$ npm i --save-dev gulp-elementsJS-interpreter
```

In case you are new to npm, the *--save-dev* simply lists the package as one of your **devDependencies** in your application's *package.json* file. To use the interpreter, see below:

```javascript

```






# <a class='titleLinks' id='imports'>The imports() function</a>
--
The **`imports()`** function is a convenience function that allows the quick importing of many modules and/or module functions all at once. It is not necessary to use this function in order to use the library, it just makes it quicker/easier to import all of its' functions separately.

- Note- Use of this function requires compilation by the **elementsJS-interpreter**.

In order to use the imports function, it must first be imported from the module as such:

```javascript
var imports = require('elementsJS').imports;
```
or,

```javascript
import { imports } from 'elementsJS';
```
## `imports( {module: funcs/moduleAlias} )`

#### Arguments

1. **`{module: funcs or moduleAlias}`** (object) - An object, the key of which is the name of a module (string) **ex. 'lodash'**, and the value is either a list of functions (array) **ex. `['make', 'go']`**, or the variable name given to the module being imported (string) **ex.** `'_'`, for **lodash**.

**Returns**: nuffin.

#### Usage

The imports function can be used to conveniently import individual functions from modules, or entire modules. If functions will be imported from the module individually, usage is as below:

```javascript
imports({
	'elementsJS': ['make', 'go', 'dom', 'on'],
   '../js/utils': ['buildMenu'], // << see Note below *
	    'lodash': '_'
});
//functions are used like so:

make('#foo', 'button');

buildMenu();
```

- Note that if only 1 function is being imported, an array still needs to be used, otherwise, the entire module will be imported. See below.


Entire modules can be imported like so:

```javascript
imports({
	'elementsJS': 'elemsJS',
   '../js/utils': 'utils',
	    'lodash': '_',
});
//functions are used like so:

elemsJS.make('#foo', 'button');

utils.buildMenu();
```
# [Click Here for the full elementsJS API](http://elementsjs.io) -->
