import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import addbook from "../services/addbook";
import Select from "@mui/material/Select"; // Import Select component
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem component
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateBookPage = () => {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // Change to state for selected category
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(2);
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
  const navigate = useNavigate();
  const handleSave = async () => {
    if (bookName && description && price && selectedCategoryId && selectedImage) {
      const payload = {
        name: bookName,
        description: description,
        price: price,
        categoryId: selectedCategoryId, // Use selected category ID
        base64image: selectedImage,
      };

      try {
        const response = await addbook.AddBook(payload);
        if (response && response.status === 200) {
          console.log("Success");
          toast.success("Book Added",{position:"top-right",});
          navigate("/books");
        }
      } catch (error) {
        console.log(error);
        toast.error("problem occured!!",{position:"top-right"});
      }

      console.log("Book Name:", bookName);
      console.log("Price:", price);
      console.log("Category:", selectedCategoryId);
      console.log("Description:", description);
      console.log("Selected Image:", selectedImage);
    } else {
      console.log("Please fill in all the fields.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Create New Book</h1>
      <TextField
        label="Book Name"
        variant="outlined"
        fullWidth
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        required
      /><b>select Category:</b>
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
   
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
      />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload"
        required
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadOutlinedIcon />}
          style={{ margin: "10px" }}
        >
          Upload Image
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSave}
        style={{ marginTop: "20px", background: "green" }}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateBookPage;
