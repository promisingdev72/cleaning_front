import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, List, ListItem, ListItemText, Checkbox, Dialog, DialogTitle } from '@mui/material';

import useAssign from '../hooks/useAssign';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getEmployees } from '../redux/slices/user';
import { getAllOrders } from '../redux/slices/order';

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  orderId: PropTypes.number,
  assignEmployees: PropTypes.array,
};

export default function SimpleDialog({ open, onClose, orderId, assignEmployees }) {
  const { addAssignEmployees } = useAssign();
  const [employeeList, setEmployeeList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [checkedEmployeeId, setCheckedEmployeeId] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const { employees } = useSelector((state) => state.user);

  useEffect(() => {
    if (employees) {
      setEmployeeList(employees);
      let tmpIsChecked = new Array(employees.length);
      for (let i = 0; i < tmpIsChecked.length; i += 1) {
        tmpIsChecked[i] = false;
      }
      setIsChecked(tmpIsChecked);
      tmpIsChecked = isChecked.slice();
      for (let i = 0; i < employees.length; i += 1) {
        tmpIsChecked[i] = assignEmployees.some((assignEmployee) => assignEmployee.employeeId === employees[i].id);
      }
      setIsChecked(tmpIsChecked);
    }
  }, [employees, assignEmployees]);

  // useEffect(() => {
  //   console.log(isChecked);
  // }, [employees, isChecked]);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (id, index) => {
    const tmpIsChecked = isChecked.slice();
    tmpIsChecked[index] = !tmpIsChecked[index];
    setIsChecked(tmpIsChecked);
    if (tmpIsChecked[index]) {
      const tmpCheckedEmployeeId = checkedEmployeeId.slice();
      tmpCheckedEmployeeId.push(id);
      setCheckedEmployeeId(tmpCheckedEmployeeId);
    } else {
      const tmpCheckedEmployeeId = checkedEmployeeId.slice();
      setCheckedEmployeeId(tmpCheckedEmployeeId.filter((ele) => ele !== id));
    }
  };

  const handleSubmit = async () => {
    const assEmployees = {
      checkedEmployeeId,
      orderId,
    };

    console.log('AAAAAAA', assEmployees);

    // try {
    //   await addAssignEmployees(assEmployees);
    //   dispatch(getAllOrders());
    // } catch (err) {
    //   console.log(err);
    // }
    onClose();
    setCheckedEmployeeId([]);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Employees for Assign</DialogTitle>
      <List>
        {employeeList.map(({ name, garage, phoneNumber, id }, index) => (
          <ListItem button key={index}>
            <Checkbox value={id} onChange={() => handleChange(id, index)} checked={isChecked[index]} />
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
