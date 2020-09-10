import React from "react";

import PropTypes from "prop-types"

import classes from "./BurgerIngridients.css"
const BurgerIngridients = (props) => {
    let ingridient = null 

    switch (props.type) {
        case ("bread-bottom"):
            ingridient = <div className={classes.BreadBottom}></div>
            break;
        case ("bread-top"):
            ingridient = (
            <div className={classes.BreadTop}>
                <div className={classes.seeds1}></div>     
                <div className={classes.seeds1}></div>
            </div>
            );
            break;
            case ("meat"):
                ingridient = <div className={classes.Meat}></div>
                break;
                
            case ("bacon"):
                    ingridient = <div className={classes.Bacon}></div>
                    break;
                    
            case ("salad"):
                    ingridient = <div className={classes.Salad}></div>
                    break;
                    
            case ("cheese"):
                ingridient = <div className={classes.Cheese}></div>
                break;
        default: 
        ingridient = null
            break;
    }
    return ingridient
}
BurgerIngridients.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngridients
