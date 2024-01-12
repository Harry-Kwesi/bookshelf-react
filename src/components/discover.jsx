/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { useState, useEffect } from "react";
import { Tooltip } from "@reach/tooltip";
import { FaSearch } from "react-icons/fa";
import { BookRow } from "./book-row";
import { client } from "../utils/api-client";
import { Input, Spinner, BookListUL } from "./lib";

function Discover() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState(false);
  // const [filteredData, setFilteredData] = useState([]);
  const isLoading = status === "loading";
  const isSuccess = status === "success";

  useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus("loading");
    client(`books?query=${encodeURIComponent(query)}`).then((responseData) => {
      setData(responseData);
      setStatus("success");
    });
  }, [query, queried]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  // useEffect(() => {
  //   const filtered = data
  //     ? data.filter((book) =>
  //         book.author.toLowerCase().includes(query.toLowerCase())
  //       )
  //     : [];

  //   setFilteredData(filtered);
  // }, [data, query]);

  // Filter the data based on the search query
  const filteredData = data
    ? data.filter((book) =>
        book.authors.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: "100%" }}
          onChange={handleSearchSubmit}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: "0",
                position: "relative",
                marginLeft: "-35px",
                background: "transparent",
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>
      {isSuccess ? (
        data.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {filteredData.map((book) => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
}

export default Discover;
