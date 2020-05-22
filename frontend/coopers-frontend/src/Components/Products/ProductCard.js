import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        // height: "auto",
      maxHeight: 450,
      margin: "0 auto",
    //   border: "1px solid #808080"
    },
    media: {
      width: "100%",
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    button: {
      background: "none",
      margin: "0 auto",
    //   color: "white",
    //   fontFamily: "Helvetica",
      width: "80%",
      "&:hover": {
        background: "none",
  
      }
    },
    price: {
      marginTop: "1rem",
      fontWeight: 550
    },
    card: {
        border: "none",
    },
    title: {
        border: "1px solid red",
        fontFamily: "Helvetica, Arial, sans-serif",
        marginTop: "1rem",
    }
  }));

const ProductCard = (props) => {
    const classes = useStyles();
    console.log(props, "props")
    return(    
    <Grid variant="outlined" className={classes.root} container direction="column" alignItems="center">
        <img className={classes.media} src={props.product.image_url} alt={props.product.title} />
        <Typography variant="overline"  component="h5" className={classes.title}>
            {props.product.title}
        </Typography>
        <Button className={classes.button} size="small"> <Typography variant="overline" display="block"> Edit</Typography> </Button>
    </Grid>
)
};

export default ProductCard