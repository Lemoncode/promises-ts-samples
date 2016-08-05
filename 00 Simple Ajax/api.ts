import { Promise } from "es6-promise";
import {MemberEntity} from './model'

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

export const gitHubAPI = new GitHubAPI();
