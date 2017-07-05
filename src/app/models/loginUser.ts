export class LoginUser {
  private username: String;
  private password: String;

  constructor(username: String, password: String) {
    this.password = password;
    this.username = username;
  }

  getUsername(): String {
    return this.username;
  }

  getPassword(): String {
    return this.password;
  }
}