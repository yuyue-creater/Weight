import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as employeeService from "../services/employeeService";
import DatePicker from '../components/controls/DatePicker';


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    memberID: '',
    name: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    weight: '',
    height: '',
    age: '',
    birthDate: '',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}


function getAge(dob) { 
    // var dob = new Date(document.getElementById("birthdate").value);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);

}


export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('memberID' in fieldValues)
            temp.memberID = fieldValues.memberID ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        // if ('email' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        // if ('mobile' in fieldValues)
        //     temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values, setValues,
        errors, setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const [value, onChange] = useState(new Date());
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Input
                        name="memberID"
                        label="MemberID"
                        value={values.memberID}
                        onChange={handleInputChange}
                        error={errors.memberID}
                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                   
                    <Controls.Input
                        label="Weight"
                        name="weight"
                        value={values.weight}
                        onChange={handleInputChange}
                    />  

                    <Controls.Input
                        label="Height"
                        name="height"
                        value={values.height}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />

                    {/* <Controls.DatePicker
                        name="birthDate"
                        label="BirthDate"
                        value={(values.birthDate)}
                        onChange={handleInputChange}
                    />   */}
                    <DatePicker onChange={onChange} value={value} />

                    <Controls.Input
                        name="age"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPnpmermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="submit changes"
                           
                            />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}