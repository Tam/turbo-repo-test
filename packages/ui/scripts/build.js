const glob = require('glob')
	, fs = require('node:fs')
	, pkg = require('../package.json')
	, path = require('node:path');

fs.rmSync(path.resolve(process.cwd(), './dist'), { recursive: true, force: true });
fs.mkdirSync(path.resolve(process.cwd(), './dist'));

glob('src/[A-Z]*.js', (err, files) => {
	if (err) throw err;

	const exports = {};


	files.forEach(file => {
		const [, name] = file.split('/');

		const p = `./dist/${name}`;
		exports[`./${name.replace('.js', '')}`] = p;
		fs.writeFileSync(path.resolve(process.cwd(), p), fs.readFileSync(path.resolve(process.cwd(), file)));
	});

	pkg.exports = exports;
	fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), JSON.stringify(pkg, null, 2));
});
