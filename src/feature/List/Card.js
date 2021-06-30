import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";

import { Row, Column, Item } from "@mui-treasury/components/flex";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    border: "2px solid",
    borderColor: "#E7EDF3",
    borderRadius: 16,
    transition: "0.4s",
    "&:hover": {
      borderColor: "#5B9FED",
    },
  },
  avatar: {
    borderRadius: 8,
    backgroundColor: "#495869",
  },
  chip: {
    borderRadius: "5px",
    padding: "8px",
    color: "white",
    fontWeight: 500,
    fontSize: "14px",
    textAlign: "center",
    lineHeight: 1.1,
  },
  overline: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#8D9CAD",
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: "#495869",
  },
  chipArray: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: "5px",
    margin: 0,
  },
  chipItem: {
    margin: "5px",
  },
  root: { paddingBottom: 0 },
  title: {
    fontSize: "1.25rem",
    color: "#122740",
  },
  about: {
    fontSize: "1rem",
    color: "#122740",
  },
  subheader: {
    fontSize: "0.875rem",
    color: "#495869",
  },
}));

const ChipActive = (isActive) => {
  const styles = useStyles();
  return (
    <div
      style={{ backgroundColor: isActive ? "#2ecc71" : "#e8382e" }}
      className={styles.chip}
    >
      {isActive ? "Active" : "Inactive"}
    </div>
  );
};

const ChipArray = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.chipArray}>
      {props.chipData.map((data, idx) => {
        return <Chip index={idx} label={data} className={classes.chipItem} />;
      })}
    </div>
  );
};

const CardHeader = (props) => {
  const styles = useStyles();
  const { data } = props;
  return (
    <Row {...props}>
      <Item position={"middle"}>
        <Typography className={styles.title}>
          <b>{`${data.firstName} ${data.lastName} - ${data.guid}`}</b>
        </Typography>
        <Typography className={styles.subheader}>Age: {data.age}</Typography>
        <Typography className={styles.subheader}>
          Gender: {data.gender}
        </Typography>
        <Typography className={styles.subheader}>
          Phone Number: {data.phone}
        </Typography>
        <Typography className={styles.subheader}>
          Email: {data.email}
        </Typography>
        <Typography className={styles.subheader}>
          <Link
            target="_blank"
            href={`https://maps.google.com/?q=${data.latitude},${data.longitude}`}
          >
            Click to view Location <LocationOnIcon></LocationOnIcon>
          </Link>
        </Typography>
      </Item>
      <Item position={"right"} mr={-0.5}>
        <ChipActive isActive={data.isActive} />
        <Typography className={styles.subheader}>
          <b>Balance: ${data.balance}</b>
        </Typography>
      </Item>
    </Row>
  );
};

export const Card = (props) => {
  const styles = useStyles();
  const gap = { xs: 1, sm: 1.5, lg: 2 };
  return (
    <Grid container spacing={4} justify={"center"}>
      <Grid item xs={12} sm={8} lg={7}>
        <Column
          className={styles.card}
          p={{ xs: 0.5, sm: 0.75, lg: 1 }}
          gap={gap}
        >
          <CardHeader data={props.data} />
          <Item>
            <Typography className={styles.about}>{props.data.about}</Typography>
          </Item>
          <ChipArray chipData={props.data.tags} />
        </Column>
      </Grid>
    </Grid>
  );
};

export default React.memo(Card);
