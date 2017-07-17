export class User {
  private username;
  private password;
  private role;
  private fullName;

  constructor(username : string, password : string, role : string, fullName : string){
    this.username = username;
    this.password = password;
    this.role = role;
    this.fullName = fullName;
  }
}