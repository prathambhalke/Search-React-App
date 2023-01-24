import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_data } from "../Redux/actions/search-action";
import "./search.css";

const SearchComponent = () => {
  const [input, setInput] = useState(["Aman"]);
  const [singledata, setsingleData] = useState();
  const [active, setActive] = useState(false);
  const [blur, setBlur] = useState(false);

  const result = useSelector((state) => state.search.data);
  // console.log(result);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${input}`
        )
        .then((res) => {
          dispatch(get_data(res?.data?.query?.search));
        });
    }, 2000);

    return () => clearTimeout(getData);
  }, [input]);

  const clickHandler = (curId) => {
    const singleitem = result.find((item) => item.pageid === curId);
    setsingleData(singleitem);
    console.log(singledata, "Clicked");

    setActive(!active);
    setBlur(!blur);
  };

  return (
    <>
      <div
        className="search_container"
        style={{ opacity: blur ? "0.5" : "1" }}
        onClick={() => {
          setActive(!active);
          setBlur(!blur);
        }}
      >
        <div className="input_container">
          <input type="text" onChange={(e) => setInput(e.target.value)} />
        </div>

        <div className="search_items">
          <p>search items</p>
          <div className="main-card">
            {input.length > 0 &&
              result.map((item) => {
                // return <p>{console.log(item.title)}</p>;

                return (
                  <div
                    key={item.pageid}
                    className="card"
                    onClick={() => clickHandler(item.pageid)}
                  >
                    <p className="item">{item.title}</p>
                    <p>{item.snippet}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        {blur && singledata && (
          <div key={singledata.pageid} className="single_card">
            <p className="item">{singledata.title}</p>
            <p>{singledata.snippet}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
