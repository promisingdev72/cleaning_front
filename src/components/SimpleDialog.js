/* eslint-disable*/
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Button, List, ListItem, ListItemText, Checkbox, Typography, Dialog, DialogTitle } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getEmployees } from '../redux/slices/user';
import { getAllOrders } from '../redux/slices/order';

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default function SimpleDialog({ open, onClose, orderId }) {
  const [employeeList, setEmployeeList] = useState([]);
  // const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();

  const assingedEmployee = [];

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllOrders());
  }, [dispatch]);

  const { employees } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (employees) {
      setEmployeeList(employees);
    }
  }, [employees]);

  // useEffect(() => {
  //   if (orders) {
  //     setOrderList(orders);
  //   }
  // }, [orders]);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    const tmpList = [];
    employeeList.map((item, index) => {
      const { isChecked } = item;
      if (value === index) tmpList.push({ ...item, isChecked: !isChecked });
      else tmpList.push(item);
      return tmpList;
    });

    setEmployeeList(tmpList);
  };

  const handleSubmit = () => {
    onClose();
    console.log(employeeList);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Employees for Assign</DialogTitle>
      <List>
        {employeeList.map(({ name, isChecked }, index) => (
          <ListItem button onClick={() => handleListItemClick(index)} key={name}>
            <Checkbox checked={isChecked} />
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" sx={{ m: 3 }} onClick={() => handleSubmit()}>
        Assign Employees
      </Button>
    </Dialog>
  );
}
