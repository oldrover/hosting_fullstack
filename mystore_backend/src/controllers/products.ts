import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

export const store = new ProductStore();

const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await store.getAllProducts();
        res.json(products);
    } catch(err) {
        res.status(400).json(err.message);
    }    
}

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await store.getProductById(req.params.id);
        res.json(product);
    } catch(err) {
        res.status(400).json(err.message);
    }
}

const saveProduct = async (req: Request, res: Response) => {    
    try {

        if(!req.body.title || !req.body.price || !req.body.category) {
                throw new Error('Body is missing values!');
        } 

        const product: Product = {
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            description: req.body.description

        }
        const newProduct = await store.saveProduct(product);
        res.json(newProduct);

    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await store.deleteProduct(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400).json(err.message);
    }     
}

const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const products = await store.getProductsByCategory(req.params.category);
        res.json(products);
    } catch (err) {
    res.status(400).json(err.message);
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);    
    app.get('/products/categories/:category', getProductsByCategory);
}

export default product_routes;


