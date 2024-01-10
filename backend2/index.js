import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const blogSchema = new mongoose.Schema({
    logo: String,
    header: String,
    text: String,  
  });

const blogModel = mongoose.model("myBlogs", blogSchema);

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findById(id);
  res.send(blog);
});  
app.get("/", async (req, res) => {
  const blog = await blogModel.find({});
  res.send(blog);
});

app.post("/", async (req, res) => {  
  const { logo , header, text } = req.body;
  const newBlog = new blogModel({  logo ,header, text });
  await newBlog.save();  
  res.send("Got a POST request");  
});    

app.put("/:id", async (req, res) => {    
    const {id} = req.params
    const {logo,header, text} = req.body;  
    const blog  = await blogModel.findByIdAndUpdate(id,{  logo ,header, text });
    
  res.send("item updated succsessfuly");
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findByIdAndDelete(id);
  res.send("item deleted successfuly");
});

mongoose.connect(process.env.SECRET_KEY).then(() => console.log("Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
