import React from 'react';
//import {withRouter} from 'react-router-dom'
import classes from './Burger.css'
import BurgerIngridients from '../../Components/Burger/BurgerIngridients/BurgerIngridients'

const burger = ( props ) => {
  //ingredient keys from the state are added to a new array and then mapped over
  let transformedIngridients = Object.keys( props.ingridient ).map((ingridientKey) => {
    //a new array with n number of indexes is created based on the value held by the key in the 'transformedIngredients' array
    return [...Array(props.ingridient[ingridientKey])].map((_, i) => {
       console.log(props.ingridient);
      //
      return <BurgerIngridients key={ingridientKey + i} type={ingridientKey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])
  console.log(typeof transformedIngridients);
  
  if (transformedIngridients.length === 0) {
    transformedIngridients = <p>Please start adding ingredients!</p>
  };
  return (
    <div className = {classes.Burger}>
      <BurgerIngridients type="bread-top" />
      {transformedIngridients}
      <BurgerIngridients type="bread-bottom" />
    </div>
  )
}


export default burger
