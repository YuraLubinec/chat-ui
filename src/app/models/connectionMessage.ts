export class ConnectionMessage {
  private id: string;
  private dialog_id: string;

  constructor(id:string, dialog_id:string){
    this.id = id;
    this.dialog_id = dialog_id;
  }

  getId() {
    return this.id;
  }

  getDialog_id() {
    return this.dialog_id
  }
}