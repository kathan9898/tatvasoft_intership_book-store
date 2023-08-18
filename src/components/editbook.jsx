import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";

const EditBook = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const response = await axios.get("https://book-e-sell-node-api.vercel.app/api/book/all");
      setBooks(response.data.result);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleEditClick = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  const handleDeleteClick = async (bookId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this book?");

    if (shouldDelete) {
      try {
        const response = await axios.delete(`https://book-e-sell-node-api.vercel.app/api/book?id=${bookId}`);
        if (response.status === 200) {
          console.log(`Book with ID ${bookId} deleted successfully.`);
          toast.success("Book deleted Successfully...",{position:"top-right"});
          // Refresh the book list after deletion
          getBooks();
        } else {
          toast.error("Something Went Wrong",{position:"top-right"});
          console.error(`Error deleting book with ID ${bookId}`);
        }
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit Books</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Link to="/crud">
          <Button variant="contained" color="primary">Add Book</Button>
        </Link>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid black" }}>ID</th>
            <th style={{ padding: "10px", borderBottom: "1px solid black" }}>Book Name</th>
            <th style={{ padding: "10px", borderBottom: "1px solid black" }}>Category</th>
            <th style={{ padding: "10px", borderBottom: "1px solid black" }}>Price (₹)</th>
            <th style={{ padding: "10px", borderBottom: "1px solid black" }}></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} style={{ borderBottom: "1px solid gray" }}>
              <td style={{ padding: "10px" }}>{book.id}</td>
              <td style={{ padding: "10px" }}>{book.name}</td>
              <td style={{ padding: "10px" }}>{book.category}</td>
              <td style={{ padding: "10px" }}>{book.price}₹</td>
              <td style={{ padding: "10px" }}>
                <Button variant="outlined" style={{ color: "green", backgroundColor: "transparent", marginRight: "5px" }} onClick={() => handleEditClick(book.id)}>Edit</Button>
                <Button variant="outlined" style={{ color: "red", backgroundColor: "transparent" }} onClick={() => handleDeleteClick(book.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditBook;
