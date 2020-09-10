import React, {Component} from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button"
class OrderSummary extends Component {
    componentWillUpdate () {
        console.log('[OrderSummary] WillUpdate');
        
    }
    render (){
    const ingridientSummary = Object.keys(this.props.ingridient)
    .map(igKey => {
        return ( <li><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingridient[igKey]} </li> )
        })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong>Total Price: </strong>{this.props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
    }
}
export default OrderSummary;
