import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Resquest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Resquest): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is not valid');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      const newTotal = balance.total - value;
      if (newTotal < 0) {
        throw Error(
          'Cannot create outcome transaction without a valid balance',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
