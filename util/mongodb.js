import mongoose from "mongoose";

//when db connected 'handler(=db connection instance)' will be created
const connectDB = (handler) => async (req, res) => {
  //if there is connection return current db connection
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  //if not? create new connection and return
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("MongoDB Connected");
  return handler(req, res);
};

export default connectDB;
