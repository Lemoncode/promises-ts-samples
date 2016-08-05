# promises-ts-samples

Simple set of samples that show how to work with promises + typescript.

The samples are based / using:

* Typescript.
* Webpack
* Fetch.

# Samples list

## 00 Simple promise and $ajax

Entry point, what happens if you want to stick to $ajax call but you want to get benefit of using promises?

In this sample we are going to hit the Github API perform a remote call using $AJAX and resolving / rejecting a promise depending on the response.

## 01 Using fetch simple case

In this sample we are going to use something more uptodate "fetch", we will use a polyfill to cover browsers that doesn't support fetch.

We are chaining promises and trapping errors using catch, more
information about promises in this [link](http://exploringjs.com/es6/ch_promises.html)

## 02 Waiting for multiple promises to be resolved

In this sample we are running more than one async request in parallel. We use the power of promises to wait for all of them
to be completed and display a message (this could be used to, for example, display a spinner or wait for all of the promises to be completed to perform some special operation).

# How to run the samples

1. Download this repo
2. Install [NodeJS](http://www.nodejs.org)  
3. Open the command line of your choice and cd to the root directory of this repo on your machine  
4. Navigate (cd) to the subfolder where relies the sample you want
to run.
6. `npm install` - Installs packages (and will install as well typescript definitions)
7. `npm start` - Builds the project and launch a lite web server (webpack-devserver).
8. Open a browser and navigate to [http://localhost:8080/](http://localhost:8080/) if your browser doesn't open automatically.
