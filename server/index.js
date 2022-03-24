import express from 'express';
import mongodb from 'mongodb';
import cors from 'cors';

const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017');
mongoClient.connect();

const db = mongoClient.db('di-project-shopping');
const productsCollection = db.collection('products');
const ordersCollection = db.collection('orders');
const cartCollection = db.collection('cart');

const PORT = 4649;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

//________________PRODUCTS________________//
app.get('/products/', async (req, res) => {
  console.log('1');
  const query = req.query;
  console.log('query', query);

  let filter = {};
  if (query.inStock) {
    filter.inStock = query.inStock === 'true';
  }
  console.log(filter);

  const products = await productsCollection.find(filter).toArray();
  res.json(products);
});

app.get('/products/:Id', async (req, res) => {
  console.log('2');
  try {
    const Id = req.params.Id;
    const product = await productsCollection.findOne({ _id: Id });

    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Something wrong with get product', err.message);
    res.sendStatus(500);
  }
});

//________________ORDERS__________________//

app.post('/orders', async (req, res) => {
  await ordersCollection.insertMany({});
  res.json({});
});

app.get('/orders', async (req, res) => {
  console.log('5');
  const result = await cartCollection.find({}).toArray();
  console.log(result);
  res.json(result);
});

//________________CART____________________//
app.post('/cart', async (req, res) => {
  console.log('3');
  const selectedProduct = req.body;
  let document = await cartCollection.insertOne(selectedProduct);
  res.json({ cartId: document.insertedId });

  // if (!document.insertedId) {
  //   let document = await cartCollection.insertOne(selectedProduct);
  //   res.cookie('cartId', document.insertedId);
  //   console.log(JSON.stringify(document.insertedId));
  //   res.json({});
  // } else {
  //   await cartCollection.updateOne(, {$push: })
  // }
});

app.post('/cart/:Id', async (req, res) => {
  const Id = req.params.Id;
  const selectedProduct = req.body;

  await cartCollection.updateOne(
    { _id: new mongodb.ObjectId(Id) },
    { $push: { products: selectedProduct.products[0] } }
  );
  res.json({});
});

app.delete('/cart/:Id/:productId', async (req, res) => {
  const Id = req.params.Id;
  const selectedProduct = req.params.productId;

  await cartCollection.updateOne(
    { _id: new mongodb.ObjectId(Id) },
    { $pull: { products: { productId: selectedProduct } } }
  );
  res.json({});
});

app.delete('/cart/:Id', async (req, res) => {
  const Id = req.params.Id;

  const documentCount = await cartCollection.count({
    _id: new mongodb.ObjectId(Id),
  });
  console.log(documentCount, 'doccount');
  console.log(Id, 'id');
  const idExists = documentCount === 1;

  if (idExists) {
    await cartCollection.deleteOne({ _id: new mongodb.ObjectId(Id) });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/cart', async (req, res) => {
  console.log('4');
  await cartCollection.deleteMany({});
  res.sendStatus(200);
});

app.get('/cart/:Id', async (req, res) => {
  const Id = req.params.Id;

  const result = await cartCollection.findOne({
    _id: new mongodb.ObjectId(Id),
  });
  console.log(result);
  res.json(result);
});

app.patch('/cart/:Id', async (req, res) => {
  const Id = req.params.Id;
  const requestBody = req.body;

  const documentCount = await cartCollection.count({
    _id: new mongodb.ObjectId(Id),
  });
  const idExists = documentCount === 1;

  if (idExists) {
    await cartCollection.updateOne(
      { _id: new mongodb.ObjectId(Id) },
      { $set: requestBody }
    );
    res.status(200).end();
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log('Up and running on: ', PORT);
});
