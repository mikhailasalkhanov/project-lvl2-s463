install:
	npm install

lint:
	npx eslint --fix .

publish:
	npm publish

start:
	npx babel-node src/bin/gendiff.js

test:
	npm run test

watch:
	jest --watch
