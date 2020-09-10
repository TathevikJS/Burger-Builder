import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls"
import Modal from "../../Components/UI/Modal/Modal.js"
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGRIDIENT_PRICES = {
    salad: 0.2,
    meat: 1.4,
    cheese: 0.4,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    /* constructor(props){
       super(props)
       this.state = {...state}
   }  */
    state = {
          /* ingridient: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }   , */
        ingridient: null,
        totalPrice: 4,

        purchasable: false,
        purchasing: false,
        loading: false,
         error: false

    }
    
     componentDidMount() {
        axios.get('/orders/Ingridients.json')
            .then(response => {
                this.setState({ ingridient: response.data })
                console.log(this.state.ingridient);
                
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
    }
    
     updatePurchasableState(ingredients) {
         ingredients = {
           ...this.state.ingridient
       }; 
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];

            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchasable: sum > 0 });
    }


    addIngridientsHandler = (type) => {
        const oldCount = this.state.ingridient[type]
        const updatedCount = oldCount + 1
        const updatedIngridients = {
            ...this.state.ingridient
        }
        updatedIngridients[type] = updatedCount
        const priceAddition = INGRIDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingridient: updatedIngridients })
        this.updatePurchasableState(updatedIngridients)
    }

    deleteIngridientsHandler = (type) => {
        const oldCount = this.state.ingridient[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngridients = {
            ...this.state.ingridient
        }
        updatedIngridients[type] = updatedCount
        const priceDeduction = INGRIDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingridient: updatedIngridients })
        this.updatePurchasableState(updatedIngridients)

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true }) // skzbum state-eri mej false
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        /*  this.setState({ loading: true })
        const order = {
            ingridient: this.state.ingridient,
            price: this.state.totalPrice,
            customer: {
                name: 'Tathevik',
                adress: {
                    street: 'Nar-Dos 69',
                    country: 'Armenia Yerevan'
                },
                email: 'tathevikpiano@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            }) 
         */    const queryParams = [];
           for(let i in this.state.ingridient){
               queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridient[i]))
           }
           queryParams.push('price=' + this.state.ingridient)
           const queryString = queryParams.join('&')
           this.props.history.push({
               pathname: '/checkout',
               search: '?' + queryString
           })
     }


    render() {
        const disabledInfo = {
            ...this.state.ingridient
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Something</p> : <Spinner />
        if(this.state.ingridient){
         burger =
            (<Aux>
                <Burger ingridient={this.state.ingridient} />
                <BuildControls
                    ingridientsAdded={this.addIngridientsHandler}
                    ingridientDeleted={this.deleteIngridientsHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </Aux>)
             orderSummary = <OrderSummary
            ingridient={this.state.ingridient}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        /> 
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios)