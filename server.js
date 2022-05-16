import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";
import db from "./db.js";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const publicPath = path.join(path.resolve(), "uploads");
app.use("/uploads", express.static(publicPath));
const feAppPath = path.join(path.resolve(), "fe-app", "build");
app.use(express.static(feAppPath));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user-exists", (req, res) => {
  const userBody = req.body;
  db.userExists(userBody)
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error");
    });
});

const docUpload = upload.any();
app.post("/create-user", docUpload, (req, res) => {
  const userBody = req.body;
  for (let index = 0; index < req.files.length; index++) {
    const element = req.files[index];
    const path = `${element.destination.replace(
      ".",
      `http://${req.headers.host}`
    )}${element.filename}`;
    if (element.fieldname === "photo") {
      userBody["photoPath"] = path;
    } else if (element.fieldname === "document") {
      userBody["documentPath"] = path;
    }
  }
  console.log(userBody);
  db.createUser(userBody)
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error");
    });
});

app.get("/products", (req, res) => {
  db.getProducts()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error");
    });
});

app.post("/login", (req, res) => {
  const userBody = req.body;
  console.log("User values", userBody.email);
  console.log("User values", userBody.password);
  db.doLogin(userBody)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error", err);
      res.send("Error");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
