import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";

export interface ITransaction {
  title: string;
  amount: number;
  category: string;
  for: string;
  payee: string;
  taxDeductionSection: string;
  startYear: number;
  startMonth: number;
  startDate: number;
  type: 'income' | 'expenses' | 'savings';
  noOfTimesRepeat: number;
  paidEmi: number;
  isSettled: boolean;
}

export interface IDropDownOption {
  label: string;
  id: string
}

export class Transaction {
  get noOfEmi(): number {
    return this.noOfTimesRepeat;
  }

  get pendingEmi(): number {
    return this.noOfEmi - this.paidEmi;
  }

  title: string = '';
  amount: number = 0;
  category: string = '';
  for: string = '';
  taxDeductionSection: string = '';
  payee: string = '';
  startDate: number = 0;
  startMonth: number = 0;
  startYear: number = 0;
  noOfTimesRepeat = 0;
  paidEmi: number = 0;
  type: 'income' | 'expenses' | 'savings' = 'expenses';
  isSettled: boolean = false;

  constructor(data?: ITransaction) {
    if (data) {
      this.title = data.title;
      this.amount = data.amount;
      this.category = data.category;
      this.for = data.for;
      this.taxDeductionSection = data.for;
      this.payee = data.payee;
      this.startDate = data.startDate;
      this.startMonth = data.startMonth;
      this.startYear = data.startYear;
      this.noOfTimesRepeat = data.noOfTimesRepeat;
      this.paidEmi = data.paidEmi;
      this.type = data.type;
      this.isSettled = data.isSettled;
    }
  }

  get everyMonthOn() {
    const j = this.startDate % 10,
      k = this.startDate % 100;
    if (j == 1 && k != 11) {
      return this.startDate + "st";
    }
    if (j == 2 && k != 12) {
      return this.startDate + "nd";
    }
    if (j == 3 && k != 13) {
      return this.startDate + "rd";
    }
    return this.startDate + "th";
  }

  /*private monthDiff() {
    const date1 = new Date(this.startYear, this.startMonth - 1, this.startDate);
    const date2 = new Date(d2);
    let months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : (months + 1);
  }*/
}

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss'],
})
export class ManageTransactionsComponent implements OnInit {
  selectedDate = new Date();
  openMenu = false;
  currencyCode = 'INR';
  selectedTab: 'income' | 'expenses' | 'savings' = 'expenses';
  transactionSample: Transaction = new Transaction({
    amount: 20000,
    noOfTimesRepeat: 10,
    startDate: 7,
    startYear: 2021,
    startMonth: 1,
    category: 'Loan',
    paidEmi: 5,
    title: 'Home Loan',
    isSettled: true,
    type: 'expenses',
    for: 'Home at Vizag',
    taxDeductionSection: '02',
    payee: '01',
  });
  defaultFormOptions = {
    title: '',
    amount: null,
    category: '',
    for: '',
    payee: '02',
    taxDeductionSection: '02',
    startDate: null,
    isSettled: false,
    noOfTimesRepeat: 0,
  }
  transactions = []
  manageCollectionTitle = 'Manage Expenses Categories';
  manageCollectionPlaceHolder = 'Expenses Category';
  manageCollectionItemEdit = '';
  manageCollectionArray: IDropDownOption[] = [];

  expensesCategories: IDropDownOption[] = [{id: 'Loan', label: 'Loan'}, {id: 'Home', label: 'Home'}];
  incomeCategories: IDropDownOption[] = [{id: '01', label: 'Option 01'}, {id: '02', label: 'Option 02'}];
  savingsCategories: IDropDownOption[] = [{id: '01', label: 'Option 01'}, {id: '02', label: 'Option 02'}];
  payees: IDropDownOption[] = [{id: '01', label: 'Option 01'}, {id: '02', label: 'Option 02'}];
  payers: IDropDownOption[] = [{id: '01', label: 'Option 01'}, {id: '02', label: 'Option 02'}];
  expensesFor: IDropDownOption[] = [{id: '01', label: 'Option 01'}, {id: '02', label: 'Option 02'}];
  taxDeductionSections: IDropDownOption[] = [{id: '01', label: 'Option 01'}, {id: '02', label: 'Option 02'}];

  constructor() {
  }

  ngOnInit(): void {
    this.manageCollectionArray = this.expensesCategories;
  }

  showManageCollectionModal(manageCollectionModal: ModalDirective, title: string, array: IDropDownOption[]) {
    this.openMenu = false;
    this.manageCollectionTitle = title;
    this.manageCollectionArray = array;
    manageCollectionModal.show();
  }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  saveTransaction(transactionForm: NgForm, addOrEditTransactionModal: ModalDirective) {
    const newTransaction: ITransaction = {
      amount: transactionForm.value.amount,
      noOfTimesRepeat: transactionForm.value.noOfTimesRepeat,
      startDate: transactionForm.value.startDate.getDate(),
      startYear: transactionForm.value.startDate.getFullYear(),
      startMonth: transactionForm.value.startDate.getMonth() + 1,
      category: transactionForm.value.category,
      paidEmi: 0,
      title: transactionForm.value.title,
      isSettled: transactionForm.value.isSettled,
      type: this.selectedTab,
      for: transactionForm.value.for,
      taxDeductionSection: transactionForm.value.taxDeductionSection,
      payee: transactionForm.value.payee,
    };
    console.log(newTransaction);
  }

  editCollectionItem(item: IDropDownOption, editInput: HTMLInputElement) {
    this.manageCollectionItemEdit = item.id;
    setTimeout(() => {
      editInput.focus();
    })
  }

  updateCollectionItem(editInput: HTMLInputElement, manageCollectionArray: IDropDownOption[], item: IDropDownOption) {
    if (editInput.value.trim().length > 0) {
      manageCollectionArray.forEach(value => {
        if (value.id === item.id) {
          value.label = editInput.value.trim();
        }
      });
      editInput.value = '';
      this.manageCollectionItemEdit = '';
    }
  }

  addCollectionItem(newInput: HTMLInputElement, manageCollectionArray: IDropDownOption[]) {
    if (newInput.value.trim().length > 0) {
      manageCollectionArray.unshift({
        id: new Date().getTime().toString(),
        label: newInput.value.trim()
      });
      newInput.value = '';
    }
  }

  deleteCollectionItem(item: IDropDownOption, manageCollectionArray: IDropDownOption[], index: number) {
    const isConfirm = confirm('Are you sure!Do you want to delete');
    if (isConfirm) {
      manageCollectionArray.splice(index, 1);
    }
  }
}

