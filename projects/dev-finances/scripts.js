const Modal = {
  toggle() {
    if (document.querySelector('.modal-overlay').classList.contains('active')) {
      document
        .querySelector('.modal-overlay.active')
        .classList.remove('active');
    } else {
      document.querySelector('.modal-overlay').classList.add('active');
    }
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  },

  set(transactions) {
    localStorage.setItem(
      'dev.finances:transaction',
      JSON.stringify(transactions)
    );
  },
};

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let inc = 0;
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        inc += transaction.amount;
      }
    });
    return inc;
  },

  expenses() {
    let exp = 0;

    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        exp += transaction.amount;
      }
    });

    return exp;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
        <td>
            <img class="remove-button" onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
    `;
    return html;
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = '';
  },
};

const Utils = {
  formatAmount(amount) {
    amount = Number(amount) * 100;
    return amount;
  },
  formatDate(date) {
    const splittedDate = date.split('-').reverse();
    return `${splittedDate[0]}/${splittedDate[1]}/${splittedDate[2]}`;
  },
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '';
    value = String(value).replace(/\D/g, '');
    value = Number(value) / 100;
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return signal + value;
  },
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = this.getValues();

    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Preencha todos os campos!');
    }
  },

  formatValues() {
    let { description, amount, date } = this.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    document.querySelectorAll('input').forEach(input => {
      input.value = '';
    });
  },

  submit(event) {
    event.preventDefault();

    try {
      this.validateFields();
      const transaction = this.formatValues();
      Transaction.add(transaction);
      this.clearFields();
      Modal.toggle();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });
    DOM.updateBalance();
    Storage.set(Transaction.all);
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();

Storage.set(Transaction.all);
Storage.get();
