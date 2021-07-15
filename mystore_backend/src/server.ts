import express, { Request, Response} from 'express';
import cors from 'cors';
import product_routes from './controllers/products';


const app = express();
const address: string = "0.0.0.0:3000";

app.use(cors());
app.use(express.json());

app.get('/', function (_req: Request, res: Response) {
    res.send('Server is running!');
});

product_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
export default app;
