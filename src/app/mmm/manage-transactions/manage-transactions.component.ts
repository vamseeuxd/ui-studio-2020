import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ModalDirective} from "ngx-bootstrap/modal";

export type TransactionType = 'income' | 'expenses' | 'savings';

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  for: string;
  payee: string;
  userEmail: string;
  taxDeductionSection: string;
  startYear: number;
  startMonth: number;
  startDate: number;
  type: TransactionType;
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
  id: string = '';
  amount: number = 0;
  category: string = '';
  for: string = '';
  userEmail: string = '';
  taxDeductionSection: string = '';
  payee: string = '';
  startDate: number = 0;
  startMonth: number = 0;
  startYear: number = 0;
  noOfTimesRepeat = 0;
  paidEmi: number = 0;
  type: TransactionType = 'expenses';
  isSettled: boolean = false;

  constructor(data?: ITransaction) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.amount = data.amount;
      this.category = data.category;
      this.for = data.for;
      this.userEmail = data.userEmail;
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
  selectedTab: TransactionType = 'expenses';
  userEmail = '';
  defaultFormOptions = {
    id: '',
    title: '',
    amount: 0,
    category: '',
    for: '',
    payee: '02',
    taxDeductionSection: '02',
    startDate: new Date(),
    isSettled: false,
    noOfTimesRepeat: 0,
  }
  transactionIdEditing = '';
  transactions: Transaction[] = [
    new Transaction({
      "id": "00001",
      "userEmail": "vamsi.flex@gmail.com",
      "amount": 3999,
      "noOfTimesRepeat": 5,
      "startDate": 10,
      "startYear": 2021,
      "startMonth": 9,
      "category": "Loan",
      "paidEmi": 0,
      "title": "Test 2",
      "isSettled": true,
      "type": "expenses",
      "for": "01",
      "taxDeductionSection": "02",
      "payee": "02"
    }),
    new Transaction({
      "id": "00002",
      "userEmail": "vamsi.flex@gmail.com",
      "amount": 20000,
      "noOfTimesRepeat": 60,
      "startDate": 7,
      "startYear": 2021,
      "startMonth": 9,
      "category": "Loan",
      "paidEmi": 0,
      "title": "Test",
      "isSettled": false,
      "type": "expenses",
      "for": "01",
      "taxDeductionSection": "02",
      "payee": "02"
    }),
  ];

  manageCollectionTitle = '';
  manageCollectionPlaceHolder = '';
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
  }

  showManageCollectionModal(manageCollectionModal: ModalDirective, title: string, array: IDropDownOption[], placeHolder: string) {
    this.openMenu = false;
    this.manageCollectionTitle = title;
    this.manageCollectionArray = array;
    this.manageCollectionPlaceHolder = placeHolder;
    manageCollectionModal.show();
  }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  async saveTransaction(transactionForm: NgForm, addOrEditTransactionModal: ModalDirective) {

    const newTransaction: ITransaction = {
      id: this.transactionIdEditing.length === 0 ? new Date().getTime().toString() : this.transactionIdEditing,
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
      userEmail: this.userEmail,
      payee: transactionForm.value.payee,
    };
    if (this.transactionIdEditing.length === 0) {
      this.transactions.unshift(new Transaction(newTransaction));
    } else {
      this.transactions = this.transactions.map(transaction => {
        if (transaction.id === this.transactionIdEditing) {
          return new Transaction(newTransaction);
        }
        return new Transaction(transaction);
      });
    }
    transactionForm.resetForm({});
    addOrEditTransactionModal.hide();
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

  editTransaction(addOrEditTransactionModal: ModalDirective, transaction: ITransaction) {
    this.transactionIdEditing = transaction.id;
    this.defaultFormOptions = {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      for: transaction.for,
      payee: transaction.payee,
      taxDeductionSection: transaction.taxDeductionSection,
      startDate: new Date(transaction.startYear, transaction.startMonth - 1, transaction.startDate),
      isSettled: transaction.isSettled,
      noOfTimesRepeat: transaction.noOfTimesRepeat,
    }
    addOrEditTransactionModal.show();
  }

  addNewTransaction(addOrEditTransactionModal: ModalDirective) {
    debugger;
    this.transactionIdEditing = '';
    this.defaultFormOptions = {
      id: '',
      title: '',
      amount: 0,
      category: '',
      for: '',
      payee: '',
      taxDeductionSection: '',
      startDate: new Date(),
      isSettled: false,
      noOfTimesRepeat: 0,
    }
    addOrEditTransactionModal.show();
  }

  getLabelByList(id: string, list: IDropDownOption[]): string {
    const item = list.find(value => value.id === id);
    if (item) {
      return item.label;
    }
    return id;
  }

  onSwipeRight($event: any) {
    this.openMenu = true;
  }

  closeSideMenu() {
    this.openMenu = false;
  }
}

