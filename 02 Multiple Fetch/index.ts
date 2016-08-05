import { Promise } from "es6-promise";
import {MemberEntity, RepositoryEntity} from "./model"

import {gitHubAPI} from "./api"

const promises : Array<Promise<any>> = [];

document.write("<p><b>async calls in progress</b></p>");

// Consuming the promise
promises.push(gitHubAPI.getListOfMembers()
  .then((response) =>
    displayMembers(response))
  );

promises.push(gitHubAPI.getListOfRepositories()
   .then((response) =>
    displayRepositories(response)
 ));

Promise.all(promises)
  .then(results => {
      document.write("<p><b>All async calls sucessfully completed</b></p>");
  })
  .catch((error) => handleError(error))
  ;

function displayMembers(members : Array<MemberEntity>)
{
  document.write("<p><b>Sample members list:</b></p>")

  members.forEach((member) => {
    document.write(`<p>${member.login}</p>`);
  });
};

function displayRepositories(repositories : Array<RepositoryEntity>)
{
  document.write("<p><b>Sample repositories list:</b></p>")

  repositories.forEach((repository) => {
    document.write(`<p>${repository.name}</p>`);
  });
};


function handleError(error)
{
  document.write(error);
}
