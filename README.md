# IoT.js and JerryScript test results
The purpose of the project is to show the official IoT.js and JerryScript test-suite results on different platforms. The testing happens once a day (at UTC 17:00) using the latest master and the result are visible on this project's gh-pages.

## Deployment:
After a successful commit to the master branch, the latest version of the project build is available automatically on the [https://samsung.github.io/iotjs-test-results/](https://samsung.github.io/iotjs-test-results/) address.

## How to use:
This project requires node.js v9.x.x or higher and npm 5.x.x or higher to be able to work properly.

```sh
# Install the nvm (node version manager).
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# Reload the .bashrc
$ source ~/.bashrc

# Clone the repository to your local drive.
$ git clone https://github.com/Samsung/iotjs-test-results

# Enter to the directory.
$ cd iotjs-test-results

# Install the selected node version (v9. in this case).
$ nvm install 9

# Install the project dependencies.
$ npm install

# To run the live reload development build.
# This will start a webpack development server and the project will run on the
# http://localhost:5001 address.
$ npm start

# To run the production build.
# The project will be builded into the /dist folder.
$ npm run build

# To check the ESLint errors.
$ npm run lint

# To fix the auto fixable ESLint errors.
$ npm run lint-autofix
```

## License:
IoT.js test result is an Open Source software under the Apache 2.0 license. Complete license and copyright information can be found within the code.
