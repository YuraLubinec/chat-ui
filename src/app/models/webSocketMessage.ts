export class WebSocketMessage {
  private text: string;
  private dialog_id: string;

  constructor(text: string, dialog_id: string) {
    this.dialog_id = dialog_id;
    this.text = text;
  }

  getText(){
    return this.text;
  }

  getDialog_id(){
    return this.dialog_id;
  }
}
