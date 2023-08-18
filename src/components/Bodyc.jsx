  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import WithAuth from "../layout/WithAuth";
  import bookService from "../services/bookService";
  import { toast } from "react-toastify";

  const Bodyc = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term input
    const [userRole, setUserRole] = useState(""); // State to store user role
  

    const getBooks = async () => {
      try {
        const response = await bookService.GetAllBooks();
        setBooks(response.data.result);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    useEffect(() => {
      getBooks();
    }, []);

    useEffect(() => {
      // Get user role from cookie named "role"
      const roleFromCookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)role\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      setUserRole(roleFromCookie);
    }, []);

    const navigate = useNavigate();

    const handleMouseEnter = (index) => {
      const updatedBooks = [...books];
      updatedBooks[index].hovered = true;
      setBooks(updatedBooks);
    };

    const handleMouseLeave = (index) => {
      const updatedBooks = [...books];
      updatedBooks[index].hovered = false;
      setBooks(updatedBooks);
    };

    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end", // To push items to the right side
      margin: "20px 10px",
    };

    const searchBarStyle = {
      border: "2px solid #007bff",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      minWidth: "200px",
      transition: "border-color 0.3s",
      marginRight: "10px", // Margin added to separate from the link
    };

    const editLinkStyle = {
      color: userRole === "3" ? "#007bff" : "grey", // Adjust the color based on the user role
      textDecoration: "none",
      fontWeight: "bold",
      marginLeft: "10px", // Margin added to separate from the search bar
      cursor: userRole === "2" ? "not-allowed" : "pointer", // Disable the cursor for role 2
    };

    // Filter books based on search term
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  
    const getCookie = (name) => {
      const cookieValue = document.cookie.replace(
        new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`),
        "$1"
      );
      return decodeURIComponent(cookieValue);
    };
    
    const handleAddToCart = async (bookId) => {
      try {
        
        const inputQuantity = parseInt(window.prompt("Enter quantity:", 1), 10);
        //const [quantity, setQuantity] = useState(1);

        if (inputQuantity > 0) {
        const userIdFromCookie = getCookie("userId"); // Get userId from cookie
        console.log(`Book with ID ${bookId} added to cart by User ${userIdFromCookie} with quantity ${inputQuantity}.`);
        const payload = {
          bookId: bookId,
          userId: userIdFromCookie,
          quantity: inputQuantity,
        };

        // Send POST request to API
        const response = await fetch('https://book-e-sell-node-api.vercel.app/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          toast.success("Added to cart",{position:"bottom-right"});
          console.log('Successfully added to cart.');
        } else {
          console.error('Error adding to cart.');
        }
        }
        else {
          console.log("Invalid quantity.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    return (
      <div>
        {/* Search bar and Edit Book link */}
        <div style={containerStyle}>
          <input
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchBarStyle}
          />
          <a href={userRole === "3" ? "/editbook" : "#"} style={editLinkStyle}>
            Edit Book
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
            justifyContent: "center",
            margin: "0 10px",
          }}
        >
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                margin: "0 10px",
                transition: "transform 0.2s",
                ...(index === 0 && { marginLeft: "0" }),
                ...(index === filteredBooks.length - 1 && { marginRight: "0" }),
                transform: books[index].hovered ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <img
                src={book.base64image}
                alt={book.name}
                style={{ maxWidth: "100%", marginBottom: "10px" }}
              />
              <h2 style={{ margin: "10px 0" }}>{book.name}</h2>
              <p>
                <b>Category:</b> {book.category}
              </p>
              <p>
                <b>Description:</b> {book.description}
              </p>
              <p>
                <b>Price: </b>
                {book.price}₹
              </p>
              <button
                onClick={() => handleAddToCart(book.id)} // Pass the book ID to the function
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default WithAuth(Bodyc);
