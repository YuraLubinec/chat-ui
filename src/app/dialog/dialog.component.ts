import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  private datepickerOpts;
  private date: Date;
  private searchForm: FormGroup;
  private dialogs: Array<Dialog>

  constructor(private dialogService: DialogService, private fb: FormBuilder) {
    this.date = null;
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
    })
  }

  onSubmit() {
    this.dialogs = [];
    let operator_name = null;
    let customer_id = null;
    let date = null;
    if (this.searchForm.value.operator_name != null && this.searchForm.value.operator_name !=""){
      operator_name = this.searchForm.value.operator_name;
    }
    if (this.searchForm.value.customer_id != null && this.searchForm.value.customer_id !=""){
      customer_id = this.searchForm.value.customer_id;
    }
    if (this.date != null) {
      date = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2)
    }
    if (operator_name != null && customer_id != null && date != null) {

    } else if (operator_name != null && customer_id != null) {

    } else if (operator_name != null && date != null) {
      this.dialogService.getAllOperatorDialogsForDate(operator_name, date ).subscribe(data => this.dialogs = data.json() as Array<Dialog>, this.searchErrorHandler);
    } else if (customer_id != null && date != null) {
      this.dialogService.getAllCustomerDialogsForDate(customer_id,date).subscribe(data => this.dialogs = data.json() as Array<Dialog>, this.searchErrorHandler);
    } else if (operator_name != null) {
      this.dialogService.getAllOperatorDialogs(operator_name).subscribe(data => this.dialogs = data.json() as Array<Dialog>, this.searchErrorHandler);
    } else if (customer_id != null) {
      this.dialogService.getAllCustomerDialogs(customer_id).subscribe(data => this.dialogs = data.json() as Array<Dialog>, this.searchErrorHandler);
    }
    else {
      this.noSearchParametersNotification = true;
    }
  }

  searchErrorHandler(error: any) {
    alert("У ході пошуку виникла помилка, спробуйте пізніше або зверніться до адміністратора");
  }



  doSmth() {
    console.log(this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2));
  }

}
