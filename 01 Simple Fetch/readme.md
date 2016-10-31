# Promises Simple Fetch Sample

In this sample we are continuing to understand the promises concept, using typescript.

## Steps to build it

We will start from sample [00 Simple Ajax] and we start using Fetch:

[00 Simple Ajax]: https://github.com/Lemoncode/promises-ts-samples/tree/master/00%20Simple%20Ajax "Lemoncode GitHub":

- Install dependencies.
- Modify the sample: Chaining Promises
- Running the project.
- Building the project

In this case, we have not the same dependencies like the first sample, then we must run in command prompt:

```
npm uninstall jquery --save
npm uninstall --save @types/jquery
```

And the webpack.config.json must be:

```javascript
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },
  entry: {
    app: "./index.ts"
  },
  output: {
  path: path.join(basePath, "dist"),
    filename: "bundle.js"
  },
  devtool: 'source-map',

plugins:[
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true
    })
  ]
}
```

We are going to install the dependencies.
```
npm install whatwg-fetch --save
npm install --save @types/whatwg-fetch
npm install
```

## Modify the sample: Chaining Promises

We can modify the promises using fetch. Now, the getListOfMembers method in api.ts file will have a promise with fetch:

```javascript
getListOfMembers() : Promise<Array<MemberEntity>> {
    return fetch('https://api.github.com/orgs/lemoncode/members')
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response)
      .then((response) => {return Promise.resolve(this.mapGitHubMembersToMemberEntityCollection(response))})
    );
}
```

Also add the next functions:

```javascript
 private checkStatus(response : Response) : Promise<Response> {
     if (response.status >= 200 && response.status < 300) {
       return Promise.resolve(response);
     } else {
       let error = new Error(response.statusText);
       throw error;
     }
 }

  private parseJSON(response : Response) : Promise<Response> {
      return response.json();
  }
```

One of the great features of promises is the ability to chain them together. In this sample, we can have the need to check the status and parse de JSon for each response. And you can chain specifics methods for each step: First, check status, then, parse the object, and then convert a JS Object.
At the end, you will answer with a Promise.resolve.

If something is wrong, you will enter by catch code.

- Now we are going to cause an error. And we'll expect the error message in the webBrowser. First, we must add a catch code:

```javascript
getListOfMembers() : Promise<Array<MemberEntity>> {
  return fetch('https://api.github.com/orgs/lemoncode/members')
    .then((response) => this.checkStatus(response))
    .then((response) => this.parseJSON(response)
    .then((response) => {return Promise.resolve(this.mapGitHubMembersToMemberEntityCollection(response))})
    .catch((error) => this.throwError(error))
  );
}
```

And also, we are going to provoke the error if the name is Braulio, for example:

```javascript
// ... (in mapGitHubMembersToMemberEntityCollection method)
member.id = gitHubMember.id;
member.login = gitHubMember.login;

/* This sentence will provoke an error */
if (member.id=1457912){
  let error = new Error(`<p>${member.id} shouldn't be in the response...</p>`);
  throw error;
}
return member;
```

Now, In order to configure the response error, we have to add a new method:

```javascript
private throwError(error){
  document.write("<p>Ops! something wrong! We are so embarrased..</p>");
  console.log(error);
  return Promise.reject(error);
}
```

Running the project

Now, we only need start de project

```
npm start
```
