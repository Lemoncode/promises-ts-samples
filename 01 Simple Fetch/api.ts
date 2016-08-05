import { Promise } from "es6-promise";
import {MemberEntity} from './model'

class GitHubAPI {
  getListOfMembers() : Promise<Array<MemberEntity>> {
      return fetch('https://api.github.com/orgs/lemoncode/members')
        .then((response) => this.checkStatus(response))
        .then((response) => this.parseJSON(response)
        .then((response) => {return Promise.resolve(this.mapGitHubMembersToMemberEntityCollection(response))})
      );
  }

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

export const gitHubAPI = new GitHubAPI();
