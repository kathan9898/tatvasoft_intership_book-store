import React, { useState, useEffect } from "react";
import WithAuth from "../layout/WithAuth";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

const Hme = () => {
  const { bookId } = useParams(); // Access the bookId parameter from the URL
const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(2); // Set the default category ID
  const [categoryList, setCategoryList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://book-e-sell-node-api.vercel.app/api/category/all"
      );
      if (response.data.code === 200) {
        setCategoryList(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateBook = async () => {
    try {
      const updatedPayload = {
        id: bookId,
        name: name,
        description: description,
        price: Number(price),
        categoryId: Number(selectedCategoryId),
        base64image: selectedImage,
      };

      const response = await axios.put(
        `https://book-e-sell-node-api.vercel.app/api/book`,
        updatedPayload
      );

      if (response && response.status === 200) {
        toast.success("Data was Updated...",{position:"top-right",});
        console.log("Book updated successfully");
        navigate("/books");
        // You can perform additional actions after successful update
      }
    } catch (error) {
      toast.error("Something Went Wrong!!",{position:"top-right",});
      console.error("Error updating book:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Update Book</h1>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      />
      <TextField
        label="Price"
        variant="outlined"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      />
      <Select
        label="Category"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "10px", width: "100%" }}
      >
        {categoryList.map(category => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload"
      />
      <label htmlFor="image-upload" style={{ width: "100%" }}>
        <Button variant="contained" component="span" color="primary" size="small" style={{ marginBottom: "10px" }}>
          Upload Image
        </Button>
      </label>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button variant="contained" color="primary" style={{background:"green"}} onClick={updateBook} size="small">
          Update Book
        </Button>
      </div>
    </div>
  );
};

export default WithAuth(Hme);
