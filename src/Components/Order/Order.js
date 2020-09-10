import React from 'react';

import classes from './Order.css'

const order = (props) => {
    const ingridients = [];

    for(let ingridientsName in props.ingridients){
        ingridients.push(
            {
                name: ingridientsName,
                mount: props.ingridients[ingridientsName]
            }
        )
    }

    const ingridientsOutput = ingridients.map(ig => {
    return <span
    style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }}
    key={ig.name}>{ig.name} ({ig.mount})
    </span>
    })
        return(
    <div className={classes.Order}>
<p>Ingridients: {ingridientsOutput}</p>
<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
)
        }
export default order;