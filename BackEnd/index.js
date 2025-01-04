const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0rkhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("FD");
    // collection for users
    const users = database.collection("users");
    // collection for products
    const products = database.collection("products");
    // collection for orders
    const orders = database.collection("orders");

    // create a new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await users.insertOne(user);
      res.send(result);
    });

    // get all users
    app.get("/users", async (req, res) => {
      const result = await users.find().toArray();
      res.send(result);
    });

    // get a single user
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await users.findOne(query);
      res.send(result);
    });

    // Update Wishlist
    app.put("/users/:email/wishlist", async (req, res) => {
      const email = req.params.email;
      const { productId } = req.body; // Expect productId in the request body

      try {
        const filter = { email };
        const updateDoc = {
          $addToSet: { wishlist: productId }, // Use $addToSet to prevent duplicates
        };
        const result = await users.updateOne(filter, updateDoc);

        if (result.modifiedCount > 0) {
          res
            .status(200)
            .send({ success: true, message: "Wishlist updated successfully." });
        } else {
          res.status(404).send({
            success: false,
            message: "User not found or no changes made.",
          });
        }
      } catch (error) {
        console.error("Error updating wishlist:", error);
        res.status(500).send({
          success: false,
          message: "An error occurred while updating the wishlist.",
        });
      }
    });

    // Add to Cart
    app.put("/users/:email/cart", async (req, res) => {
      const email = req.params.email;
      const { productId } = req.body; // Expect productId in the request body

      try {
        const filter = { email };
        const updateDoc = {
          $addToSet: { cart: productId }, // Use $addToSet to prevent duplicates
        };
        const result = await users.updateOne(filter, updateDoc);

        if (result.modifiedCount > 0) {
          res
            .status(200)
            .send({ success: true, message: "Cart updated successfully." });
        } else {
          res.status(404).send({
            success: false,
            message: "User not found or no changes made.",
          });
        }
      } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).send({
          success: false,
          message: "An error occurred while updating the cart.",
        });
      }
    });

    // create a new product
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await products.insertOne(product);
      res.send(result);
    });

    // get all products
    app.get("/products", async (req, res) => {
      const result = await products.find().toArray();
      res.send(result);
    });

    // get a single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await products.findOne(query);
      res.send(result);
    });

    // create a new order
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orders.insertOne(order);
      res.send(result);
    });

    // get all orders
    app.get("/orders", async (req, res) => {
      const result = await orders.find().toArray();
      res.send(result);
    });

    // get a single order
    app.get("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orders.findOne(query);
      res.send(result);
    });

    app.get("/trends", async (req,res)=>{
      const result = await products.find().toArray();
      res.send(result);

    });

    // update a single order
    app.put("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const order = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: order.status,
        },
      };
      const result = await orders.updateOne(query, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`);
});
