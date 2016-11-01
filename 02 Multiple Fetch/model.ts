export class MemberEntity {
  id: number;
  login: string;
  avatar_url: string;

  constructor() {
    this.id = -1;
    this.login = "";
  }
};

export class RepositoryEntity {
  id: number;
  name: string;

  constructor(){
    this.id = -1;
    this.name = "";
  }
};