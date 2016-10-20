import {MemberEntity} from "./model";
import {gitHubAPI} from "./api";

// Consuming the promise
gitHubAPI.getListOfMembers()
.then(
    (members: Array<MemberEntity>) => {
        displayMembers(members);
    }
)
.catch((err) => {
  document.write("Server error");
});

function displayMembers(members:Array<MemberEntity>)
{
  document.write("<p><b>Sample members list:</b></p>");

  members.forEach((member) => {
    document.write(`<p>${member.login}</p>`);
  });
};
