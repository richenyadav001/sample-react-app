// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";

const uri =
  "mongodb://appuser:apppasword@localhost:27017/assignment?authSource=test_db&readPreference=primary&directConnection=true&ssl=false";

const client = new MongoClient(uri);

const doLogin = async (loginCreds) => {
  try {
    await client.connect();
    const database = client.db("assignment");
    const users = database.collection("users");
    const query = { email: loginCreds.email };
    console.log("Query", query);
    const user = await users.findOne(query);
    if (user) {
      if (user.password === loginCreds.password) {
        delete user.password;
        return user;
      } else {
        return "Incorrect User/Password";
      }
    } else {
      return "Incorrect User/Password";
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const getUser = async (uid) => {
  try {
    await client.connect();
    const database = client.db("assignment");
    const users = database.collection("users");
    // Query for a movie that has the title 'Back to the Future'
    const query = { uid: uid };
    const user = await users.findOne(query);
    console.log(user);
    return user;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const createUser = async (userObj) => {
  try {
    await client.connect();
    const database = client.db("assignment");
    const users = database.collection("users");
    const query = { email: userObj.email };
    const user = await users.findOne(query);
    if (!user) {
      const result = await users.insertOne(userObj);
      console.log(result);
      delete userObj.password;
      return userObj;
    } else {
      console.log(user);
      return "User already exist.";
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const userExists = async (userObj) => {
  try {
    await client.connect();
    const database = client.db("assignment");
    const users = database.collection("users");
    // Query for a movie that has the title 'Back to the Future'
    const query = { email: userObj.email };
    const user = await users.findOne(query);
    if (!user) {
      return false;
    } else {
      return true;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const getProducts = async () => {
  try {
    await client.connect();
    const database = client.db("assignment");
    const products = database.collection("products");
    const items = await products.find().toArray();
    console.log("Items", items);
    return items;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const db = {
  getUser: getUser,
  createUser: createUser,
  doLogin: doLogin,
  getProducts: getProducts,
  userExists: userExists,
};

export default db;
