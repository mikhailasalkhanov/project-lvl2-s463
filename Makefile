install:
	npm install

lint:
	npx eslint .

publish:
	npm publish

start:
	npx babel-node src/bin/gendiff.js

test:
	npm run test
	