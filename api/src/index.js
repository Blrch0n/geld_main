const express = require("express");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { connectDatabase } = require("./database");
const { Category } = require("./model/category.model");
const { User } = require("./model/user.model");
const { Record } = require("./model/record.model");
const app = express();
connectDatabase();
app.use(cors());
app.use(bodyParser.json());

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ userEmail: email });

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = jwt.sign({ email }, "secret-boy");

  res.json({
    token,
  });
});

app.post("/sign-up", async (req, res) => {
  // const filePath = "src/data/users.json";
  // const usersRaw = await fs.readFile(filePath, "utf-8");
  // const users = JSON.parse(usersRaw);
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ userEmail: email });
    if (user) {
      return res.status(401).json({
        message: "user already exists",
      });
    }
    await User.create({
      name: name,
      userEmail: email,
      password: password,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    // await fs.writeFile(filePath, JSON.stringify(users));
    const token = jwt.sign({ email }, "secret-boy");
    res.json({
      token,
      message: "user already exists",
    });
  } catch (err) {
    console.log(err);
  }
});
app.post("/category", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "error",
    });
  }
  try {
    const verify = jwt.verify(authorization, "secret-boy");
    const { email } = verify;
    const { categoryName, IconColor, selectedIcon } = req.body;
    // const filePath = "src/data/category.json";
    // const rawFile = await fs.readFile(filePath, "utf8");

    // const file = JSON.parse(rawFile);

    await Category.create({
      categoryName: categoryName,
      IconColor: IconColor,
      selectedIcon: selectedIcon,
      userEmail: email,
      Date: new Date(),
    });

    // await fs.writeFile(filePath, JSON.stringify(file));
    res.json({
      message: "fine",
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});
app.get("/category", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "error",
    });
  }
  try {
    const verify = jwt.verify(authorization, "secret-boy");

    const { email } = verify;

    // const filePath = "src/data/category.json";

    // const rawFile = await fs.readFile(filePath, "utf-8");

    // const file = JSON.parse(rawFile);

    const userCategory = await Category.find({ userEmail: email });

    res.json({
      userCategory,
    });
  } catch (err) {
    res.status(401).json({
      message: "error1",
    });
  }
});
app.post("/records", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(authorization, "secret-boy");

    const { email } = payload;

    const {
      amount,
      date,
      isExpense,
      selectedCategory,
      time,
      IconColor,
      selectedIcon,
    } = req.body;

    // const filePath = "src/data/records.json";

    // const recordsRaw = await fs.readFile(filePath, "utf8");

    // const records = JSON.parse(recordsRaw);

    await Record.create({
      amount: amount,
      date: new Date(date),
      isExpense: isExpense,
      selectedCategory: selectedCategory,
      time: time,
      IconColor: IconColor,
      selectedIcon: selectedIcon,
      userEmail: email,
    });

    // await fs.writeFile(filePath, JSON.stringify(records));

    res.json({
      message: "Record created",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

app.get("/records", async (req, res) => {
  const { authorization } = req.headers;
  const { days, sort } = req.query;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(authorization, "secret-boy");

    const { email } = payload;

    // const filePath = "src/data/records.json";

    // const recordsRaw = await fs.readFile(filePath, "utf8");

    // const records = JSON.parse(recordsRaw);

    const filterDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * days);
    console.log(days, filterDate);

    const usersRecords = await Record.find({ userEmail: email });

    const filterData = usersRecords.filter((record) => {
      return record.date > filterDate;
    });

    // items.sort((a, b) => {
    //   const DateA = new Date(a.date).getTime()
    //   const DateB = new Date(b.date).getTime()
    //   if (sort === "Recently") {
    //     return -1;
    //   }
    //   if (sort === "Oldest") {
    //     return 1;
    //   }
    //   return 0;
    // });

    if (sort === "Recently") {
      filterData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    if (sort === "Oldest") {
      filterData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    res.json({
      records: filterData,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});
const port = 3001;

app.listen(port, () => {
  console.log(`Example app listen on port ${port}`);
});
