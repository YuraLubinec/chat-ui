export class LoginUser {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.password = password;
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}