export class Message {

  private text: string;
  private date: string;
  private username: string;
  private isOperator: boolean;

  constructor(text: string, username: string, isOperator: boolean) {

    this.text = text;
    this.username = username;
    this.isOperator = isOperator;
    let d = new Date;
    this.date = d.toLocaleDateString() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }

}