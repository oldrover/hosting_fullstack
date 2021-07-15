//@ts-ignore
import Client from '../database';

export type Product = {
    id?: number;
    title: string;
    price: string;
    image: string;
    category: string;
    description: string;

}

export class ProductStore {
    async getAllProducts(): Promise<Product[]> {
        
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);        
            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`Cannot get products: ${err}`);
        }      
    }
    async getProductById(id: string): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);        
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not find product with id:${id}. Error: ${err}`);
        }   
    }

    async saveProduct(product: Product): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (title, price, image, category, description) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const result = await conn.query(sql, [
                product.title, 
                product.price, 
                product.image, 
                product.category, 
                product.description]);        
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not add new product ${product.title}. Error: ${err}`);
        }
    }

    async deleteProduct(id: string): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not delete product with id ${id}. Error: ${err}`);
        }
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1) ORDER BY title ASC';
            const result = await conn.query(sql, [category]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products by category ${category}`);
        }
    }
}
