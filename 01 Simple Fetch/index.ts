import {MemberEntity} from "./model"

import {gitHubAPI} from "./api"

// Consuming the promise
gitHubAPI.getListOfMembers()
  .then((response) =>
    displayMembers(response)
  )
  .catch((error) => handleError(error));

function displayMembers(members:Array<MemberEntity>)
{
  document.write("<p><b>Sample members list:</b></p>")

  members.forEach((member) => {
    document.write(`<p>${member.login}</p>`);
  });
};

function handleError(error)
{
  document.write(error);
}
