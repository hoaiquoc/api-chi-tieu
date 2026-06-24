"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const node_crypto_1 = require("node:crypto");
class TransactionRepository {
    transactions = [
        {
            id: (0, node_crypto_1.randomUUID)(),
            title: 'An sang',
            amount: 45000,
            type: 'Expense',
            transactionDate: new Date().toISOString(),
            note: 'Banh mi va ca phe',
        },
        {
            id: (0, node_crypto_1.randomUUID)(),
            title: 'Luong thang',
            amount: 15000000,
            type: 'Income',
            transactionDate: new Date(Date.now() - 86400000).toISOString(),
            note: 'Chuyen khoan',
        },
    ];
    getAll() {
        return [...this.transactions].sort((a, b) => b.transactionDate.localeCompare(a.transactionDate));
    }
    getById(id) {
        return this.transactions.find((item) => item.id === id);
    }
    add(transaction) {
        const created = {
            id: (0, node_crypto_1.randomUUID)(),
            ...transaction,
        };
        this.transactions.push(created);
        return created;
    }
    update(id, transaction) {
        const existing = this.getById(id);
        if (!existing) {
            return undefined;
        }
        existing.title = transaction.title;
        existing.amount = transaction.amount;
        existing.type = transaction.type;
        existing.transactionDate = transaction.transactionDate;
        existing.note = transaction.note;
        return existing;
    }
    delete(id) {
        const index = this.transactions.findIndex((item) => item.id === id);
        if (index < 0) {
            return false;
        }
        this.transactions.splice(index, 1);
        return true;
    }
}
exports.TransactionRepository = TransactionRepository;
