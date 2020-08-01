const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTS

//create a category
app.post("/categories", async(req, res) => {
    try {
        const {description} = req.body;
        const newCategory = await pool.query("INSERT INTO category (description) VALUES ($1) RETURNING *", [description]);
            res.json(newCategory.rows[0]);
       // console.log(req.body);
    } catch (error) {
        console.error(error.message);
    }

})

//get all todos
app.get("/categories", async (req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM category");
        res.json(allCategories.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get a category

app.get("/categories/:id", async (req, res) => {
   try {
       const { id } = req.params;
       const category = await pool.query("SELECT * FROM category WHERE category_id = $1", [id]);
       res.json(category.rows[0]);
   } catch (error) {
    console.error(error.message);
   }
})

//update a category

app.put("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateCategory = await pool.query("UPDATE category SET description = $1 WHERE category_id = $2", [description, id]);
        res.json("Category was updated");
    } catch (error) {
        console.error(error.message);
    }
})

//delete a category

app.delete("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await pool.query("DELETE FROM category WHERE category_id = $1", [id]);
        res.json("Category was deleted");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});