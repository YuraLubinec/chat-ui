import {DialogMessage} from './dialogMessage'

export class Dialog {
  private id : string;
  private date: string;
  private customerId: string;
  private operator: string;
  private holdTime: number;
  private rate: number;
  private messages: Array<DialogMessage>;
  private redirectTo: Array<string>; 
}