/* eslint-disable*/
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Button, List, ListItem, ListItemText, Checkbox, Typography, Dialog, DialogTitle } from '@mui/material';

import useAssign from '../hooks/useAssign';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getEmployees } from '../redux/slices/user';
import { getAssignEmployees } from '../redux/slices/assign';

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default function SimpleDialog({ open, onClose, orderId }) {
  const { addAssignEmployees } = useAssign();
  const [employeeList, setEmployeeList] = useState([]);
  const [assignEmployees, setAssignEmployeeList] = useState([]);
  const dispatch = useDispatch();

  const assingedEmployee = [];

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAssignEmployees(orderId));
  }, [dispatch]);

  const { employees } = useSelector((state) => state.user);
  const { assignes } = useSelector((state) => state.assign);

  useEffect(() => {
    if (employees) {
      setEmployeeList(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (assignes) {
      setAssignEmployeeList(assignes);
    }
  }, [assignes]);

  const handleClose = () => {
    onClose();
  };

  const [checkedEmployeeId, setCheckedEmployeeId] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      checkedEmployeeId.push(e.target.value);
    } else {
      const tmpCheckedEmployeeId = checkedEmployeeId.slice();
      setCheckedEmployeeId(tmpCheckedEmployeeId.filter((ele) => ele !== e.target.value));
    }
  };

  const handleSubmit = async () => {
    const assEmployees = {
      checkedEmployeeId,
      orderId,
    };
    try {
      await addAssignEmployees(assEmployees);
    } catch (err) {
      console.log(err);
    }
    onClose();
    setCheckedEmployeeId([]);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Employees for Assign</DialogTitle>
      <List>
        {employeeList.map(({ name, garage, phoneNumber, isChecked, id }, index) => (
          <ListItem button key={index}>
            <Checkbox value={id} onChange={handleChange} />
            <ListItemText primary={name} sx={{ mx: 5 }} />
            <ListItemText primary={garage} sx={{ mx: 5 }} />
            <ListItemText primary={phoneNumber} sx={{ mx: 5 }} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" sx={{ m: 3 }} onClick={() => handleSubmit()}>
        Assign Employees
      </Button>
    </Dialog>
  );
}
