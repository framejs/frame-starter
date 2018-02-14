'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'FrameJS');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'src/components/'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'dist'));

fractal.web.set('builder.dest', __dirname + '/www');

/*
 * An object of options to pass to the underlying BrowserSync instance.
 */
fractal.web.set('server.syncOptions', {
    watchOptions: {
        ignored: path.resolve('dist/**/*'),
    },
});