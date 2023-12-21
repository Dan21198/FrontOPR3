export class User {
  public id: number;
  public userName: string;
  public email: string;
  public password : string;
  constructor(userId: number, userName: string, email: string, password: string) {
    this.id = userId;
    this.userName = userName;
    this.email = email;
    this.password = password
  }
}
