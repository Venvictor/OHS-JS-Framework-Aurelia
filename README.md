OHS-JS-Framework-Aurelia
========================

This is a simple Aurelia app developed for the OHS JS framework shootout/bakeoff/smackdown. It implements the [OHS JS Framework Skeleton](https://github.com/schreiaj/OHS-JS-Framework-Skeleton). The [Aurelia Skeleton Navigation App](https://github.com/aurelia/skeleton-navigation) was used as a starting point.

Running The App
---------------

To run the app, follow these steps.

1.	Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2.	From the project folder, execute the following command:

```shell
  npm install
```

1.	Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

```shell
  npm install -g gulp
```

1.	Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following command:

```shell
  npm install -g jspm
```

> **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub `Settings > Personal Access Tokens`), `public_repo` access for the token is required. 5. Install the client-side dependencies with jspm:

```shell
  jspm install -y
```

> **Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`. 6. To run the app, execute the following command:

```shell
  gulp watch
```

1.	Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

> Note: At present there is a bug in the HTMLImports polyfill which only occurs on IE. We have submitted a pull request to the team with the fix. In the mean time, if you want to test on IE, you can work around the issue by explicitly adding a script tag before you load system.js. The script tag should look something like this (be sure to confirm the version number):

```html
<script src="jspm_packages/github/webcomponents/webcomponentsjs@0.5.2/HTMLImports.js"></script>
```

Running The App under Electron
------------------------------

To run the app under [Electron](http://electron.atom.io), follow these steps.

1.	Install [Electron](http://electron.atom.io)

```shell
  npm install electron-prebuilt -g
```

1.	To start the app, execute the following command:

```shell
  electron .
```

Bundling
--------

Bundling is performed by [Aurelia Bundler](http://github.com/aurelia/bundler). A gulp task is already configured for that. Use the following command to bundle the app:

```shell
    gulp bundle
```

You can also unbundle using the command bellow:

```shell
  gulp unbundle
```

Running The Unit Tests
----------------------

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1.	Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

```shell
  npm install -g karma-cli
```

1.	Install Aurelia libs for test visibility:

```shell
jspm install aurelia-framework
jspm install aurelia-http-client
jspm install aurelia-router
```

1.	You can now run the tests with this command:

```shell
  karma start
```

Running The E2E Tests
---------------------

Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1.	Place your E2E-Tests into the folder `test/e2e/src`
2.	Install the necessary webdriver

```shell
  gulp webdriver_update
```

1.	Configure the path to the webdriver by opening the file `protractor.conf.js` and adjusting the `seleniumServerJar` property. Typically its only needed to adjust the version number.

2.	Make sure your app runs and is accessible

```shell
  gulp watch
```

1.	In another console run the E2E-Tests

```shell
  gulp e2e
```
