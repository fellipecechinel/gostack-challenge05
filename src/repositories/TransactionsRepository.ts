import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (sum, next) => {
        return {
          total: sum.total + next.value * (next.type === 'outcome' ? -1 : 1),
          income: sum.income + (next.type === 'income' ? next.value : 0),
          outcome: sum.outcome + (next.type === 'outcome' ? next.value : 0),
        };
      },
      {
        total: 0,
        income: 0,
        outcome: 0,
      },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
