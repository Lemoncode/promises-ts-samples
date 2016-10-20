# Promises Simple Fetch Sample

In this sample we are continuing to understand the promises concept, using typescript.

We will start from sample [00 Simple Fetch] and we turn of the screw using multiple Fetch.

[00 Simple Fetch]: https://github.com/Lemoncode/promises-ts-samples/tree/master/01%20Simple%20Fetch "Lemoncode GitHub"


## Steps to build it

We will start from sample _01 Simple Fetch_:

- Install dependencies.
- Modify the sample 01: Turn of the screw
- Running the project.


## Building the project

We are going to install the dependencies. In this case, we have de same dependencies like the lastest sample, then we must run in command prompt:

```bash
npm install
```

## Modify the sample 01: Turn of the screw

It's time to create a sample with multiple ajax requests, and be able to perform an action when all requests are completed. In order to complete the sample, we must create a new object for de second ajax request.

- Let's create a new class called _RepositoryEntity_ in _model.ts_ file:

```javascript
export class RepositoryEntity {
  id: number;
  name: string;

  constructor(){
    this.id = -1;
    this.name = "";
  }
};
```
- Now, we must create a new method in _api.ts_ file to request the ajax petition with fetch:
```javascript
getListOfRepositories() : Promise<Array<RepositoryEntity>> {
    return fetch('https://api.github.com/orgs/lemoncode/repos')
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response)
      .then((response) => {return Promise.resolve(this.mapGitHubRepositoriesToRepositoryEntityCollection(response))})
    );
}
```
And also, let's create a _mapGitHubRepositoriesToRepositoryEntityCollection_ method:

```javascript

 private mapGitHubRepositoriesToRepositoryEntityCollection(data)
{
  var repositories : Array<RepositoryEntity>;

  repositories = data.map(
    gitHubRepo =>
    {
     var repository: RepositoryEntity = new RepositoryEntity();

     repository.id = gitHubRepo.id;
     repository.name = gitHubRepo.name

     return repository;
   });

  return repositories;
}
```

- The turn of the screw is found in the _index.ts_ file. All promises are including in the variable *promises* with type 'Array<Promise<any>>'.
we can consume the promise using *push* method:
```javascript
promises.push(gitHubAPI.getListOfMembers()
  .then((response) =>
    displayMembers(response))
  );
  ```

We have two ajax requests, and the responses of them are asyncronous, so, if we reload the web browser will see first response to a request or response to other request.
Now, we add a new call when all promises are completed:
```javascript
Promise.all(promises)
  .then(results => {
      document.write("<p><b>All async calls sucessfully completed</b></p>");
  })
  .catch((error) => handleError(error))
  ;
```


## Running the project

The best way to understand this sample is running the project.

```bash
npm start
```
