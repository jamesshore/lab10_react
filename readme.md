The Lab: Front-End Frameworks: React
===========

This repository contains the sample code for the [Front-End Frameworks: React](http://www.letscodejavascript.com/v3/episodes/lab/10) ([Part 1](http://www.letscodejavascript.com/v3/episodes/lab/10), [Part 2](http://www.letscodejavascript.com/v3/episodes/lab/10)) episodes of James Shore's [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com) screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

This episode is an exploration and review of the [React](http://facebook.github.io/react/) library for building front-end user interfaces. This repository contains an example application written in React. It demonstrates several concepts:

1. **Sample application.** The sample application code can be found in `src/client`. The app runs inside `index.html`. It launches from `main.js`. The UI code is in the JSX files in `src/client/ui`, starting with `application_ui.jsx`.

  The application also includes a domain layer, value objects, and a (simulated) persistence layer. Those layers are in subdirectories of `src/client`. See the screencast for more information about the sample app. (In particular, the way value objects are rendered was an experiment to see how well React could deal with an unusual architecture, not a pattern to follow in your own applications.)

2. **Unit Tests.** All the code is unit tested. You can find tests of the React code in `src/client/ui/_*_test.jsx`. The React tests demonstrate three different approaches: string comparison using `React.renderComponentToStaticMarkup()`, and targeted DOM comparisons using the TestUtils library (the second test), and a hybrid approach for comparing React components directly. (The hybrid approach is very useful, but it pokes into React internals, so you may want to avoid it or limit your use.)

3. **Production-mode JSX transformation.** We use Jake to translate React's JSX language to JavaScript. See the "compileJsx" target in `Jakefile.js` and `build/util/jsx_runner.js` for example code. You can use `jsx_runner.js` in your own build scripts. 

4. **Modularity.** We use CommonJS `require()` statements for modularity, and we use Browserify to make it work. See the sample application for an example of how the modularity works in practice. See the "browserify" target in `Jakefile.js` and `build/util/browserify_runner.js` for the automated build. You can use `browserify_runner.js` in your own build scripts.

For further details about how this code works, watch [the screencast](http://www.letscodejavascript.com/v3/episodes/lab/10).


Setup
-----

To try this code on your own computer:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip the source code into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.


Running the Sample Application
------------------------------

1. Run `./jake.sh run` (Unix/Mac) or `jake run` (Windows)
2. Open `http://localhost:8080` in a browser.


Running the Tests
-----------------

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test and point each one at `http://localhost:9876`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test.


License
-------

MIT License. See `LICENSE.TXT`.