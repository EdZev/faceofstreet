develop:
	npx webpack serve

install:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test -s

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
