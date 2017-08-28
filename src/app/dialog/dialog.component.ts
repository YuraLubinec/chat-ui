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
  noSearchParametersNotification: boolean;
  noSearchResult: boolean;
  datePickerFromOpts;
  datePickerToOpts;
  dateStart: Date;
  dateEnd: Date;
  searchForm: FormGroup;
  dialogs: Array<Dialog>;
  display: boolean;
  private selectedDialog: Dialog;

  constructor(private dialogService: DialogService, private fb: FormBuilder) {
    this.dateStart = null;
    this.dateEnd = null;
    this.display = false;
    this.dialogs = [];
    this.datePickerFromOpts = {
      autoclose: true,
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      language: "uk",
      placeholder: 'Виберіть дату початку'
    }
    this.datePickerToOpts = {
      autoclose: true,
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      language: "uk",
      placeholder: 'Виберіть кінцеву дату'
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
    let dateStart = null;
    let dateEnd = null;
    if (this.searchForm.value.operator_name && this.searchForm.value.operator_name != "") {
      operator_name = this.searchForm.value.operator_name;
    }
    if (this.searchForm.value.customer_id && this.searchForm.value.customer_id != "") {
      customer_id = this.searchForm.value.customer_id;
    }
    if (this.searchForm.value.text && this.searchForm.value.text != "") {
      text = this.searchForm.value.text;
    }
    if (this.dateStart && this.dateEnd && this.dateStart < this.dateEnd) {

      dateStart = this.dateStart.getFullYear() + '-' + ('0' + (this.dateStart.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateStart.getDate()).slice(-2)
      dateEnd = this.dateEnd.getFullYear() + '-' + ('0' + (this.dateEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateEnd.getDate()).slice(-2)
    }
    if (operator_name && customer_id && dateStart && dateEnd) {
      this.dialogService.getAllCustomerAndOperatorDialogsForDate(customer_id, operator_name, dateStart, dateEnd).subscribe(this.dataHandler, this.searchErrorHandler);
    } else if (operator_name && customer_id) {
      this.dialogService.getAllCustomerAndOperatorDialogs(customer_id, operator_name).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (operator_name && dateStart && dateEnd) {
      this.dialogService.getAllOperatorDialogsForDate(operator_name, dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (customer_id && dateStart && dateEnd) {
      this.dialogService.getAllCustomerDialogsForDate(customer_id, dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (operator_name) {
      this.dialogService.getAllOperatorDialogs(operator_name).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (customer_id) {
      this.dialogService.getAllCustomerDialogs(customer_id).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (dateStart && dateEnd) {
      this.dialogService.getAllForDate(dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    } else if (text && text != "") {
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
    this.dateStart = null;
    this.dateEnd = null;
    this.createEmptyForm();
  }

  searchErrorHandler(error: any) {
    console.log(error);
    alert("У ході пошуку виникла помилка, спробуйте пізніше або зверніться до адміністратора");
  }

}
