import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Card from "./Card";

const useStyles = makeStyles(() => ({
  container: {
    padding: "30px",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(1);

  const fetchList = (off) => {
    axios
      .get("/data?offset=" + offset)
      .then(function (response) {
        if (response.data.length < 20) {
          setHasMore(false);
        }
        setList(list.concat(response.data));
        setOffset(off + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated");
    if (isAuthenticated !== "true") {
      history.replace("/login");
    }
    fetchList(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <InfiniteScroll
        style={{ width: "100%", overflow: "hidden" }}
        dataLength={list.length}
        next={() => fetchList(offset)}
        hasMore={hasMore}
      >
        {list.map((e, index) => (
          <Card index={index} data={e}></Card>
        ))}
      </InfiniteScroll>
    </div>
  );
}
