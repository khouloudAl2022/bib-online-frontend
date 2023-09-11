import axios from "axios";
import React, { useEffect, useState } from "react";
import CardBook from "../components/CardBook";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/books/getbooks");
        console.log("booooooooks", res);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    getBooks();
  }, []);
  return (
    <div>
      {books.map((book) => (
        <CardBook book={book} key={book.id} />
      ))}
    </div>
  );
};

export default Home;
