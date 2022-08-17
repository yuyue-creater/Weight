import React, { useState, useEffect } from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../components/useTable";
import * as employeeService from "../services/employeeService";
import Controls from "../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import axios from 'axios';
import * as Adapter from "./Adapter";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

// Character features for each member.
const headCells = [
    { id: 'memberID', label: 'MemberID' },
    { id: 'name', label: 'Employee Name' },
    { id: 'weight', label: 'Weight' },
    { id: 'birthDate', label: 'Age' },
    { id: 'height', label: 'Height' },
    { id: 'gender', label: 'Gender' }
]

export default function Employees() {

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        axios("http://localhost:8000/api/get").then(
            (res) => {
                employeeService.empty();
                res.data.forEach(employee => employeeService.insertEmployee(employee));
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching data: ", error);
                setError(true);
            }
        );
    }, []);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }


    // Adding or editing a member
    const addOrEdit = (employee, resetForm) => {

        // Insert a member to the list
        if (employee.id === 0) {
            employeeService.insertEmployee(employee)
            Adapter.createMember(employee)
        }
        // Update a member's information
        else {
            employeeService.updateEmployee(employee)
            Adapter.updateMember(employee)
        }


        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())

        // Show that a membe is added
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    // Delete a member
    const onDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        // Remove the member from the list
        employeeService.deleteEmployee(id);

        // Set up the new record
        setRecords(employeeService.getAllEmployees())

        // Notify that a member is deleted
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }


    if (loading) return "loading..."


    function getAge(dob) { 
        // var dob = new Date(document.getElementById("birthdate").value);
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    
    }

    return (
        <>
            <PageHeader
                title="New Event Member"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Members"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New Member"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.memberID}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.weight}</TableCell>
                                <TableCell>{item.birthDate}</TableCell>
                                <TableCell>{item.height}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'This action can not be undone',
                                                subTitle: "Are you sure you want to delete this member?",
                                                onConfirm: () => { onDelete(item.id); Adapter.deleteMember(item.memberID) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}