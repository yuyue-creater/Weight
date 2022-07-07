import React from "react";

export const ProductListMember = ({item}) => {
    return <div>
        <div> Member name : {item.name}, Weight : {item.weight} kg, Age: {item.age}, Height: {item.height} cm</div>
      
    </div>;
};