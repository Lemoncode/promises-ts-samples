import { Promise } from "core-js";
import {MemberEntity, RepositoryEntity} from './model';

class GitHubAPI {
  getListOfMembers() : Promise<Array<MemberEntity>> {
    return fetch('https://api.github.com/orgs/lemoncode/members')
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response)
      .then((response) => {return Promise.resolve(this.mapGitHubMembersToMemberEntityCollection(response))})
      .catch((error) => this.throwError(error))
    );
  }

  getListOfRepositories() : Promise<Array<RepositoryEntity>> {
    return fetch('https://api.github.com/orgs/lemoncode/repos')
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response)
      .then((response) => {return Promise.resolve(this.mapGitHubRepositoriesToRepositoryEntityCollection(response))})
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

      /* This sentence will provoke an error */
      // if (member.id=1457912){
      //   let error = new Error(`<p>${member.id} shouldn't be in the response...</p>`);
      //   throw error;
      // }

      return member;
    });

    return members;
  }

  private throwError(error){
    document.write("<p>Ops! something wrong! We are so embarrased..</p>");
    console.log(error);
    return Promise.reject(error);
  }

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
}

export const gitHubAPI = new GitHubAPI();
