# Promises Simple Ajax Sample

In this sample we are going to understand the promises concept, using typescript.

This project is bundle by Webpack and we can review some samples in [GitHub].

[GitHub]: https://github.com/Lemoncode/webpack-1.x-by-sample "Lemoncode GitHub"

First of all, we use $ajax to get some information from server and we will benefit from promises. The main idea is that we send a request and, depending the response, resolve or reject the promise.

## Steps to build it

We will start from scratch.

- Configure dependencies in package.json, installing the needed packages.
- Configure typings.json
- Configure loaders and plugins in webpack.config.js
- Configure tsconfig.json
- And let's understand the circuit of Promises.


## Building the project

We are going to start from scratch, so let's start by executing _npm init_
(remember that the project name should not contains blank spaces and capital
letters).

```
npm init
```

Let's start installing dev dependencies:

```
npm install webpack html-webpack-plugin ts-loader typescript typings webpack-dev-server --save-dev
```

Now, we will install more dependencies but, not devDependencies.

```
npm install es6-promise jquery --save
```

Now, we must configure some commands in our package.json with stripts entry:

```
"scripts": {
    "postinstall": "typings install",
    "start": "webpack-dev-server --inline",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Let's create a file called _tsconfig.json_ where we will put the typescript configuration.
```javascript
{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "declaration": false,
      "noImplicitAny": false,
      "sourceMap": true,
      "noLib": false,
      "suppressImplicitAnyIndexErrors": true
    },
    "compileOnSave": false,
    "exclude": [
        "node_modules"
    ]
}

```

Also, let's create other file called _typings.json_ and will put typings configuration.
```javascript
{
  "globalDependencies": {
    "es6-promise": "registry:dt/es6-promise#0.0.0+20160614011821",
    "jquery": "registry:dt/jquery#1.10.0+20160704162008"
  }
}
```

Now, we configure the _webpack.config.js_ file:
- Adding variables:

```javascript
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname;
```
- Configuring module property:

```javascript
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
}
```
- Configuring plugin property:

  ```javascript
plugins:[
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
  }),
  //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html', //Name of file in ./dist/
    template: 'index.html', //Name of template in ./src
    hash: true
  })
]
```
- Adding more configuration in webpack.config.js

```javascript
resolve: {
      extensions: ['', '.js', '.ts']
},
entry: {
   vendor: ["jquery"],
   app: "./index.ts"
},
output: {
  path: path.join(basePath, "dist"),
  filename: "bundle.js"
},

devtool: 'source-map',
```

## Understanding promises

- First, we will create a entity class for convert Json Object to JS Object. It's very important we must put _export class_ to use in _index.ts_ later. Let's create a _model.ts_ file:

```javascript
export class MemberEntity {
  id: number;
  login: string;
  avatar_url: string;

  constructor() {
    this.id = -1;
    this.login = "";
    this.avatar_url = "";
  }
}
```
This is a simple sample. We can modify the constructor if we want.

- Next, we create a _api.ts_ file, where we will call ajax with promises and we will transform the json received to Array Object.
  - First, import _promises_ and the _model_:

  ```javascript
    import { Promise } from "es6-promise";
    import {MemberEntity} from './model';
  ```
  - Second, let's create a _GitHubAPI_ class, with two methods: (1) In _getListOfMembers()_ we call ajax inside a promise definition. If all it's ok, then we will go into *success* property, calling the _mapGitHubMembersToMemberEntityCollection_ function. If something's wrong, then we must go into the *error* property, rejecting this. Don't forget binding this. The second method in _GitHubAPI_ class, _mapGitHubMembersToMemberEntityCollection_, we will transform JSonData to Array<MemberEntity> js Object. We will use the => expression.

  ```javascript
  class GitHubAPI {
    getListOfMembers() {
      const promise = new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://api.github.com/orgs/lemoncode/members',
            dataType: 'json',
            cache: false,
            success: function (data: any) {
              resolve(this.mapGitHubMembersToMemberEntityCollection(data));
            }.bind(this),
            error: function (xhr: any, status: any, err: any) {
              reject(console.log(err));
            }.bind(this)
        });
      });

      return promise;
    }

    private mapGitHubMembersToMemberEntityCollection(data)
    {
      var members : Array<MemberEntity>;

      members = data.map((gitHubMember) => {
        var member : MemberEntity = new MemberEntity();

        member.id = gitHubMember.id;
        member.login = gitHubMember.login;
        member.avatar_url = gitHubMember.avatar_url;

        return member;
      });

      return members;
    }
  }  
  ```
  - At the end, we must export the class for using in _index.ts_:
  ```javascript
  export const gitHubAPI = new GitHubAPI();
  ```

- Next step: we use, _api.ts_ and _model.ts_ in _index.ts_ and this file will write in html file:
 - First, let's import the files:
 ```javascript
 import {MemberEntity} from "./model";
 import {gitHubAPI} from "./api";
 ```
 - Now, we are going to cosume the promise (Call the promise and put  _then_ code and _catch_ code):

 ```javascript
 gitHubAPI.getListOfMembers()
.then(
    (members: Array<MemberEntity>) => {
        displayMembers(members);
    }
)
.catch((err) => {
  document.write("Server error");
});
```
 When you go into the _then_ code, you have available the variable _members_. This is the return of the function that you called on sucess property, in this case, resolving _mapGitHubMembersToMemberEntityCollection_

 - We have also other function to print array(of MemberEntity) object: _displayMembers_

  ```javascript
 function displayMembers(members:Array<MemberEntity>)
{
  document.write("<p><b>Sample members list:</b></p>")

  members.forEach((member) => {
    document.write(`<p>${member.login}</p>`);
  });
}
 ```

To finalize the sample, we dump the javascript in a _index.html_ sample:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    Showing list of members from GitHub rest API
  </body>
</html>
```

## Running the sample

Now, we can see the sample in the browser throwing this sentences in the command license
```Bash
npm run postinstall

npm start
```
