import {makeStyles} from "@material-ui/core";

export default makeStyles(
  theme => ({
    header: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    wrapper: {
      marginRight: theme.spacing(2),
    },
    title: {
      ...theme.typography.h4,
      lineHeight: "52px", // buttons height
    },
    buttons: {
      display: "flex",
      flexGrow: 1,
    },
  }),
  {name: "PageHeader"},
);