const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const util = require('util');
const port = process.env.PORT || 4000;

// const cors = require('cors');
// Configure CORS more securely
app.use(cors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Client-Platform']
}));

// app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://fahim:dbpassfahim@cluster01.qzkyj.mongodb.net/?retryWrites=true&w=majority&appName=cluster01`;
// mongodb+srv://<db_username>:<db_password>@cluster0.0rkhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

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

    // const database = client.db("FD");
    // // collection for users
    // const users = database.collection("users");
    // // collection for products
    // const products = database.collection("products");
    // // collection for orders
    // const orders = database.collection("orders");
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("FD");
    const users = database.collection("users");
    const products = database.collection("products");
    // const orders = database.collection("orders");

    console.log("Product schema");
    const sampleDocs = await products.find({}).limit(10).toArray();
    const sampleDocs1 = await users.find({}).limit(10).toArray();
const schemaInfo = {};
const schemaInfo1={};
sampleDocs.forEach(doc => {
  Object.keys(doc).forEach(field => {
    schemaInfo[field] = typeof doc[field];
  });
});

sampleDocs1.forEach(doc => {
    Object.keys(doc).forEach(field => {
      schemaInfo1[field] = typeof doc[field];
    });
  });

  console.log(schemaInfo);
console.log(schemaInfo1);


// Add this after your database connection
const collections = await database.listCollections().toArray();
const usersCollection = collections.find(col => col.name === 'users');
if (usersCollection) {
  console.log('Current users collection schema:');
  console.log(JSON.stringify(usersCollection.options.validator, null, 2));
}

    // create a new user
    // app.post("/users", async (req, res) => {
    //   const user = req.body;
    //   const result = await users.insertOne(user);
    //   res.send(result);
    // });

    // app.post("/users", async (req, res) => {
    //     try {
    //       const user = req.body;
      
    //       // Ensure dates are properly converted to Date objects
    //       const newUser = {
    //         ...user,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
    //         wishlist: user.wishlist || [],
    //         cart: user.cart || [],
    //         address: user.address || [],
    //       };
      
    //       console.log('Attempting to insert user:', JSON.stringify(newUser, null, 2));
      
    //       const result = await users.insertOne(newUser);
          
    //       console.log('Insert result:', result);
          
    //       res.status(201).json({
    //         success: true,
    //         message: "User created successfully",
    //         data: result
    //       });
    //     } catch (error) {
    //       console.error("Error creating user:", error);
    //       // Log the detailed validation error if available
    //       if (error.errInfo) {
    //         console.error("Validation details:", JSON.stringify(error.errInfo, null, 2));
    //       }
    //       res.status(400).json({
    //         success: false,
    //         message: "Failed to create user",
    //         error: error.message,
    //         details: error.errInfo
    //       });
    //     }
    //   });

    //it worked
    // app.post("/users", async (req, res) => {
    //     try {
    //       const userData = req.body;
          
    //       // Convert the $date format to actual Date objects
    //       const userToInsert = {
    //         ...userData,
    //         createdAt: new Date(userData.createdAt.$date),
    //         updatedAt: new Date(userData.updatedAt.$date),
    //         dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null
    //       };
      
    //       const result = await users.insertOne(userToInsert);
      
    //       res.status(201).json({
    //         success: true,
    //         message: "User created successfully",
    //         userId: result.insertedId
    //       });
      
    //     } catch (error) {
    //       console.error("Error creating user:", error);
    //       res.status(400).json({
    //         success: false,
    //         message: "Failed to create user",
    //         error: error.message,
    //         details: error.errInfo
    //       });
    //     }
    //   });

    app.post("/users", async (req, res) => {
        try {
          const userData = req.body;
          
          // Ensure cart is initialized as an empty array
          const userToInsert = {
            ...userData,
            cart: [],           // Initialize empty cart array
            wishlist: [],       // Initialize empty wishlist array
            address: [],        // Initialize empty address array
            createdAt: new Date(userData.createdAt.$date),
            updatedAt: new Date(userData.updatedAt.$date),
            dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
            phone: userData.phone || { number: null, countryCode: null }
          };
      
          console.log('Attempting to insert user:', JSON.stringify(userToInsert, null, 2));
      
          const result = await users.insertOne(userToInsert);
      
          res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: result.insertedId
          });
      
        } catch (error) {
          console.error("Error creating user:", error);
          
          // If it's a validation error, send more detailed information
          if (error.code === 121) {
            const validationErrors = error.errInfo?.details?.schemaRulesNotSatisfied;
            res.status(400).json({
              success: false,
              message: "Validation failed",
              details: validationErrors
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Failed to create user",
              error: error.message
            });
          }
        }
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
    // app.put("/users/:email/cart", async (req, res) => {
    //   const email = req.params.email;
    //   const { productId } = req.body; // Expect productId in the request body

    //   try {
    //     const filter = { email };
    //     const updateDoc = {
    //       $addToSet: { cart: productId }, // Use $addToSet to prevent duplicates
    //     };
    //     const result = await users.updateOne(filter, updateDoc);

    //     if (result.modifiedCount > 0) {
    //       res
    //         .status(200)
    //         .send({ success: true, message: "Cart updated successfully." });
    //     } else {
    //       res.status(404).send({
    //         success: false,
    //         message: "User not found or no changes made.",
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error updating cart:", error);
    //     res.status(500).send({
    //       success: false,
    //       message: "An error occurred while updating the cart.",
    //     });
    //   }
    // });

    // create a new product
    app.post("/products", async (req, res) => {
        const product = req.body;

        // Convert validUntil string to Date
        if (product.discount?.validUntil) {
          product.discount.validUntil = new Date(product.discount.validUntil);
        }
        const result = await products.insertOne(product);
    });

    // get all products
    // app.get("/products", async (req, res) => {
    //   const result = await products.find().toArray();
    //   res.send(result);
    // });

    app.get("/products", async (req, res) => {
        console.log('GET /products request received');
        console.log('Request headers:', req.headers);
        console.log('Client IP:', req.ip);
      
        try {
          // Log the connection status
          console.log('MongoDB connection state:', client.topology?.isConnected() ? 'connected' : 'disconnected');
      
          // Attempt to fetch products
          console.log('Attempting to fetch products from database...');
          const result = await products.find().toArray();
          
          // Log the result summary
          console.log('Products fetched successfully');
          console.log('Number of products:', result.length);
          console.log('First product sample:', util.inspect(result[0], { depth: 0, colors: true }));
      
          // Send response
          res.send(result);
      
        } catch (error) {
          // Detailed error logging
          console.error('Error in GET /products:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            name: error.name
          });
      
          // Check for specific error types
          if (error.name === 'MongoNetworkError') {
            console.error('MongoDB Network Error - Check database connection');
          }
      
          if (error.name === 'MongoServerError') {
            console.error('MongoDB Server Error:', error.code);
          }
      
          // Send appropriate error response
          res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
          });
        }
      });

    // get a single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await products.findOne(query);
      res.send(result);
    });








    // Add to Cart endpoint
app.put("/users/:email/cart", async (req, res) => {
  try {
    const { email } = req.params;
    const { productId, quantity, size, color } = req.body;

    // Validate inputs
    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: productId, quantity, size, and color"
      });
    }

    // Create cart item
    const cartItem = {
      productId: new ObjectId(productId),
      quantity: parseInt(quantity),
      size: size,
      color: color,
      addedAt: new Date()
    };

    // Check if product exists
    const productExists = await products.findOne({ _id: new ObjectId(productId) });
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Update user's cart
    const result = await users.updateOne(
      { 
        email,
        "cart.productId": new ObjectId(productId),
        "cart.size": size,
        "cart.color": color
      },
      {
        $set: {
          "cart.$": cartItem,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      // Item doesn't exist in cart, add it
      const addResult = await users.updateOne(
        { email },
        {
          $push: { cart: cartItem },
          $set: { updatedAt: new Date() }
        }
      );

      if (addResult.modifiedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
    }

    // Get updated user data
    const updatedUser = await users.findOne({ email });

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedUser.cart
    });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message
    });
  }
});
  
  // Optional: Get Cart Items endpoint
  app.get("/users/:email/cart", async (req, res) => {
    try {
      const { email } = req.params;
  
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Fetch product details for cart items
      const cartWithDetails = await Promise.all(
        user.cart.map(async (item) => {
          const product = await products.findOne({ _id: item.productId });
          return {
            ...item,
            product: {
              name: product.name,
              price: product.price,
              image: product.variants.find(v => v.color === item.color)?.images[0]?.url
            }
          };
        })
      );
  
      res.status(200).json({
        success: true,
        cart: cartWithDetails
      });
  
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch cart",
        error: error.message
      });
    }
  });
  
  // Optional: Remove from Cart endpoint
  // Update Cart Item Quantity
app.put("/users/:email/cart/:productId", async (req, res) => {
  try {
    const { email, productId } = req.params;
    const { quantity } = req.body;

    // Validate input
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    // Validate productId format
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    // Update the cart item quantity
    const result = await users.updateOne(
      { 
        email, 
        "cart.productId": new ObjectId(productId)
      },
      {
        $set: {
          "cart.$.quantity": parseInt(quantity),
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    // Get updated cart
    const updatedUser = await users.findOne({ email });
    
    // Get product details for the updated cart
    const cartWithDetails = await Promise.all(
      updatedUser.cart.map(async (item) => {
        const product = await products.findOne({ _id: item.productId });
        return {
          ...item,
          product: {
            name: product.name,
            price: product.price,
            image: product.variants.find(v => v.color === item.color)?.images[0]?.url
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: cartWithDetails
    });

  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message
    });
  }
});

// Delete Cart Item
app.delete("/users/:email/cart/:productId", async (req, res) => {
  try {
    const { email, productId } = req.params;

    // Validate productId format
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    // Remove the item from cart
    const result = await users.updateOne(
      { email },
      {
        $pull: {
          cart: { productId: new ObjectId(productId) }
        },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    // Get updated cart
    const updatedUser = await users.findOne({ email });
    
    // Get product details for the remaining cart items
    const cartWithDetails = await Promise.all(
      (updatedUser.cart || []).map(async (item) => {
        const product = await products.findOne({ _id: item.productId });
        return {
          ...item,
          product: {
            name: product.name,
            price: product.price,
            image: product.variants.find(v => v.color === item.color)?.images[0]?.url
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      cart: cartWithDetails
    });

  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
      error: error.message
    });
  }
});

// Get Cart Items with Product Details
app.get("/users/:email/cart", async (req, res) => {
  try {
    const { email } = req.params;

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get product details for each cart item
    const cartWithDetails = await Promise.all(
      (user.cart || []).map(async (item) => {
        const product = await products.findOne({ _id: item.productId });
        return {
          ...item,
          product: {
            name: product.name,
            price: product.price,
            image: product.variants.find(v => v.color === item.color)?.images[0]?.url
          }
        };
      })
    );

    res.status(200).json({
      success: true,
      cart: cartWithDetails
    });

  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message
    });
  }
});








    app.put("/products/:productId/variants/images", async (req, res) => {
      const { productId } = req.params;
      const { color, size, images } = req.body;

      if (!color || !size || !images || !Array.isArray(images)) {
        return res.status(400).json({
          error: "Missing required fields: color, size, and images array",
        });
      }

      try {
        const result = await products.updateOne(
          {
            _id: new ObjectId(productId),
            variants: {
              $elemMatch: { color, size },
            },
          },
          {
            $push: {
              "variants.$.images": { $each: images },
            },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({
            error: "Product or variant not found",
          });
        }

        res.json({
          message: "Images added successfully",
          modifiedCount: result.modifiedCount,
          productId,
          color,
          size,
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
          error: error.message,
        });
      }
    });

    app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;
    
      try {
        const result = await products.deleteOne({ _id: new ObjectId(id) });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Product not found" });
        }
    
        res.json({
          message: "Product deleted successfully",
          deletedCount: result.deletedCount,
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: error.message });
      }
    });


    // Import ObjectId only if needed for other endpoints
// const { ObjectId } = require('mongodb'); // Optional: Remove if not needed

app.delete("/api/productss/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Attempting to delete product with ID:", id);

    const result = await products.deleteOne({ _id: id });
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Product deleted successfully",
      deletedCount: result.deletedCount 
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting product", 
      error: error.message 
    });
  }
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

    app.get("/trends", async (req, res) => {
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

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});
