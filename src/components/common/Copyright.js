import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";

export default function Copyright() {
  // classes created because it is needed in the footer.
  const classes = makeStyles(theme => ({
    // added the footer class
    footer: {
      padding: theme.spacing(2),
      marginTop: "auto",
      backgroundColor: "white",
      // just this item, push to bottom
      alignSelf: "flex-end"
    }
  }))
  return (
    <Container className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/ACRacusa">
          Aldrin Racusa
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}