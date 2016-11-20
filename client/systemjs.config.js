/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
	System.config({
		paths: {
			// paths serve as alias
			'npm:': 'node_modules/'
		},
		// map tells the System loader where to look for things
		map: {
			// our app is within the app folder
			app: 'app',
			// angular bundles
			'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
			'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
			'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
			'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
			// other libraries
			'rxjs':                      'npm:rxjs',
			'ng2-bootstrap':             'npm:ng2-bootstrap',
			'moment':                    'npm:moment',
			'ng2-file-upload':           'npm:ng2-file-upload',
			'socket.io-client':          'npm:socket.io-client',
			'ng2-toastr':                'npm:ng2-toastr'
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages: {
			app: {
				main: './main.js',
				defaultExtension: 'js'
			},
			rxjs: {
				defaultExtension: 'js'
			},
			'ng2-bootstrap': {
				main: 'ng2-bootstrap.js',
				defaultExtension: 'js'
			},
			'moment': {
				main: 'moment.js',
				defaultExtension: 'js'
			},
			'ng2-file-upload': {
				main: 'ng2-file-upload.js',
				defaultExtension: 'js'
			},
			'socket.io-client': {
				main: 'socket.io.js',
				defaultExtension: 'js'
			},
			'ng2-toastr': {
				main: 'ng2-toastr.js',
				defaultExtension: 'js'
			}
		}
	});
})(this);