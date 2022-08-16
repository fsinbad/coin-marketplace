import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/others/header";
import Hero from "../components/others/hero";
import TableBox from "../components/coins/table-box";

function CoinsPage() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = 100;
  const findPageCount = (data) => setPageCount(Math.ceil(data / pageSize));

  /*
  // ISSUE - Cannot update coins and then use it as it always gives []
  // So passing coins straight from response.data via "data" parameter
  const findCoinRank = (data, coin) =>
    (page - 1) * pageSize + data.indexOf(coin) + 1;

  const addRankToCoins = (data) =>
    data.map((coin) => ({ ...coin, rank: findCoinRank(data, coin) }));
   */

  // Retrieve total number of coins
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((response) => {
        findPageCount(response.data.data.active_cryptocurrencies);
        console.log(response.data.data.active_cryptocurrencies);
      })
      .catch((err) => console.log(err));
  }, []); // findPageCount - if included, runs too many times (remove []?)

  // Retrieve data of 100 coins on specific page
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((response) => {
        console.log(response.data);
        // setData(addRankToCoins(response.data));
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, [page]); // This will run everytime page changes.

  return (
    // Replace className App with something else
    <div className="App">
      <Header></Header>
      <Hero></Hero>
      <TableBox
        data={data}
        setData={setData}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      ></TableBox>
    </div>
  );
}

export default CoinsPage;