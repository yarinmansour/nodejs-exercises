"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const products = store_1.store.products;
function setup(app) {
    app.get('/api/products', (req, res) => res.send(products));
    app.get('/api/products/:id', (req, res) => {
        const id = req.params.id;
        const existing = products.find(p => p.id === id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (!existing) {
            res.sendStatus(404);
            return;
        }
        res.send(existing);
    });
    app.post('/api/products', (req, res) => {
        const product = req.body;
        product.id = (products.length + 1).toString();
        if (product.name.length < 3) {
            res.sendStatus(409);
            return;
        }
        products.push(product);
        res.status(201).send(product);
    });
    app.put('/api/products/:id', (req, res) => {
        const id = req.params.id;
        const existing = products.find(p => p.id === id);
        const product = req.body;
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (product.name.length < 3) {
            res.sendStatus(409);
            return;
        }
        if (!existing) {
            res.sendStatus(404);
            return;
        }
        product.id = id;
        Object.assign(existing, product);
        res.send(product);
    });
    app.delete('/api/products/:id', (req, res) => {
        const id = req.params.id;
        const existingIndex = products.findIndex(p => p.id === id);
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        if (existingIndex < 0) {
            res.sendStatus(404);
            return;
        }
        products.splice(existingIndex, 1);
        res.sendStatus(204);
    });
}
exports.default = setup;
//# sourceMappingURL=products.js.map