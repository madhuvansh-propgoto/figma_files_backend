// const app = require('./src/app');

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // app.use("/uploads", express.static("uploads"));

const app = require('./src/app');

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
