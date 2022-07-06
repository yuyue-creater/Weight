import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
import React, { useState } from 'react'
import Categories from './Categories';

const Category = () => {
    const [data, setData] = useState(Categories);
    const filterWeightChange = (catItem)=> {
        const result=Categories.filter((curData) => {
            return curData.weight_change_category === catItem;
        });
        setData(result);
    }

    const filterLocation = (catItem)=> {
        const result=Categories.filter((curData) => {
            return curData.Event_location === catItem;
        });
        setData(result);
    }

    return (
        <>
            <h1 className="text center text-info">Please select a category to update your events</h1>
            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">

                        <button className="btn btn-warning w-100 mb-4" onClick={
                            ()=>filterWeightChange("Lowering")}>Weight Lowering</button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-warning w-100 mb-4" onClick={
                            ()=>filterWeightChange("Raising")}>Weight Raising</button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-warning w-100 mb-4" onClick={
                            ()=>filterLocation("Outdoors")}>Out-door Exercises</button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-warning w-100 mb-4" onClick={
                            ()=>filterLocation("Indoors")}>In-door Exercises</button>
                        <br></br>
                        <br></br>
                        <button className="btn btn-warning w-100 mb-4" onClick={
                            ()=>filterWeightChange("Raising")}>Weight Change</button>
                        <br></br>
                        <br></br>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {data.map((values) => {
                                const {id, title, weight_change_effective, weight_change_category, Event_location, image} = values;
                                return (
                                    <>
                                        <div className="col-md-4 mb-4" key={id}>
                                            <div class="card">
                                                <img src={image} 
                                                className="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title"> {title}</h5>
                                                    <p>weight change category: {weight_change_category}</p>
                                                    <p>Weight change efficiency: {weight_change_effective}</p>
                                                    <p class="card-text">Let's update this event</p>
                                                    <a href="#" class="btn btn-secondary">Update this event</a>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Category;
