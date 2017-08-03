import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Dialog } from '../models/dialog';
import { DialogMessage } from '../models/dialogMessage';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [DialogService]
})
export class DialogComponent implements OnInit {
  private noSearchParametersNotification: boolean;
  private noSearchResult: boolean;
  private datepickerOpts;
  private date: Date;
  private searchForm: FormGroup;
  private dialogs: Array<Dialog>;
  private display: boolean;
  private selectedDialog: Dialog;

  constructor(private dialogService: DialogService, private fb: FormBuilder) {
    this.date = null;
    this.display = false;
    this.dialogs = [];
    this.datepickerOpts = {
      autoclose: true,
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      language: "uk",
      placeholder: 'Виберіть дату'
    }
  }

  ngOnInit() {

    this.createEmptyForm();
  }

  createEmptyForm() {

    this.searchForm = this.fb.group({
      operator_name: [null],
      customer_id: [null],
      text: [null]
    })
  }

  onSubmit() {
    this.dialogs = [];
    this.noSearchParametersNotification = false;
    this.noSearchResult = false;
    let text = null;
    let operator_name = null;
    let customer_id = null;
    let date = null;
    if (this.searchForm.value.operator_name != null && this.searchForm.value.operator_name != "") {
      operator_name = this.searchForm.value.operator_name;
    }
    if (this.searchForm.value.customer_id != null && this.searchForm.value.customer_id != "") {
      customer_id = this.searchForm.value.customer_id;
    }
    if (this.searchForm.value.text != null && this.searchForm.value.text != "") {
      text = this.searchForm.value.text;
    }
    if (this.date != null) {
      date = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2)
    }
    if (operator_name != null && customer_id != null && date != null) {
      this.dialogService.getAllCustomerAndOperatorDialogsForDate(customer_id, operator_name, date).subscribe(this.dataHandler, this.searchErrorHandler);
    } else if (operator_name != null && customer_id != null) {
      this.dialogService.getAllCustomerAndOperatorDialogs(customer_id, operator_name).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (operator_name != null && date != null) {
      this.dialogService.getAllOperatorDialogsForDate(operator_name, date).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (customer_id != null && date != null) {
      this.dialogService.getAllCustomerDialogsForDate(customer_id, date).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (operator_name != null) {
      this.dialogService.getAllOperatorDialogs(operator_name).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (customer_id != null) {
      this.dialogService.getAllCustomerDialogs(customer_id).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (date != null) {
      this.dialogService.getAllForDate(date).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (text != null){
      this.dialogService.getAllDialogsWithTextInMessage(text).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    }
    else {
      this.noSearchParametersNotification = true;
    }
  }

  private dataHandler(data: Response) {
    this.dialogs = data.json() as Array<Dialog>;
    if (this.dialogs.length == 0) {
      this.noSearchResult = true;
    }
  }

  showDialog(dialog: Dialog) {
    this.selectedDialog = dialog;
    this.display = true;
  }

  hideDialog() {
    this.display = false;
    this.selectedDialog = null;
  }

  reset() {
    this.noSearchParametersNotification = false;
    this.noSearchResult = false;
    this.dialogs = [];
    this.date = null;
    this.createEmptyForm();
  }

  searchErrorHandler(error: any) {
    alert("У ході пошуку виникла помилка, спробуйте пізніше або зверніться до адміністратора");
  }

  doSmth() {
    console.log(this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2));
  }

}
