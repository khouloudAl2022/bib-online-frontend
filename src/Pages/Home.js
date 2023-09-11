import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CardBook from "../components/CardBook";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
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

  // download files pdf
  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/books/downloadfile/${id},`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {books.map((book) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CardBook book={book} key={book._id} downloadFile={downloadFile}/>
        </div>
      ))}
    </div>
  );
};

export default Home;
