import React, { useState } from 'react';

export const ProductForm = ({addProductProp }) => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');



    const addProduct = _ => {
        addProductProp ({
            id : (new Date).getTime(),
            name, weight, age, height
    
        })
        setName('');
        setWeight('')
        setAge('');
        setHeight('')
    }

    return <div>
        <h1>Add Product</h1>
        <input type="text" placeholder='Member Name' value={name} onChange={
            event => {
                setName(event.target.value)
            }
        } />
        <input type="text" placeholder='Weight' value={weight} onChange={
            event => {
                setWeight(event.target.value)
            }
        }/>
        <input type="text" placeholder='Age' value={age} onChange={
            event => {
                setAge(event.target.value)
            }
        }/>
        <input type="text" placeholder='Height' value={height} onChange={
            event => {
                setHeight(event.target.value)
            }
        }/>
        <input type="button" value='Add' onClick={addProduct} />
    </div>
};