"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
class TransactionsController {
    transactionRepository;
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    getIdParam(request) {
        const { id } = request.params;
        return Array.isArray(id) ? id[0] : id;
    }
    getAll = (_request, response) => {
        response.json(this.transactionRepository.getAll());
    };
    getById = (request, response) => {
        const transaction = this.transactionRepository.getById(this.getIdParam(request));
        if (!transaction) {
            response.status(404).json({ message: 'Transaction not found' });
            return;
        }
        response.json(transaction);
    };
    create = (request, response) => {
        const payload = request.body;
        const created = this.transactionRepository.add(payload);
        response.status(201).json(created);
    };
    update = (request, response) => {
        const payload = request.body;
        const updated = this.transactionRepository.update(this.getIdParam(request), payload);
        if (!updated) {
            response.status(404).json({ message: 'Transaction not found' });
            return;
        }
        response.json(updated);
    };
    delete = (request, response) => {
        const deleted = this.transactionRepository.delete(this.getIdParam(request));
        if (!deleted) {
            response.status(404).json({ message: 'Transaction not found' });
            return;
        }
        response.status(204).send();
    };
}
exports.TransactionsController = TransactionsController;
