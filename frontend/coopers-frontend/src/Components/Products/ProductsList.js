import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Grid, GridList, GridListTile } from "@material-ui/core";
import ProductCard from "./ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import { getProducts } from "../../Store/Actions/products";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
  
      justifyContent: "center",
      height: "auto",
      flexGrow: 1,
    },
    gridList: {
      alignItems: "center",
      width: "90%",
      // flexWrap: 'wrap',
      // width: 500,
      // [theme.breakpoints.down('md')]: {
      //   width: "100%",
      // }
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    gridListTile: {
      margin: "1rem auto",
      width: "10%",
      justifyContent: "space-between",
      maxWidth: 270,
    },
  }));

const ProducstList = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const classes = useStyles();
    // console.log("products: ", products)

    useEffect(() => {
        dispatch(getProducts())
        
        return () => {
            console.log("unsubscribe ");
          };
    }, [dispatch]);

    const getGridListCols = () => {
        if (isWidthUp("xl", props.width)) {
          return 5;
        }
    
        if (isWidthUp("lg", props.width)) {
          return 4;
        }
    
        if (isWidthUp("md", props.width)) {
          return 3;
        }
        if (isWidthUp("sm", props.width)) {
          return 2;
        }
        return 1;
      };

    return (
        <Grid>
            <GridList
                cols={getGridListCols()}
                cellHeight={380}
                className={classes.gridList}>
                {products.map((product, key) => (
                    <GridListTile className={classes.gridListTile} key={product.id}>
                        <ProductCard
                            product={product}
                        ></ProductCard>
                    </GridListTile>
                ))}
      </GridList>
        </Grid>
    )
};

export default withWidth()(ProducstList);