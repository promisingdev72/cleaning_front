import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem } from '@mui/material';

import useAuth from '../../../../hooks/useAuth';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

OrderTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onAssignRow: PropTypes.func,
  onStatusRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function OrderTableRow({
  row,
  selected,
  onEditRow,
  onAssignRow,
  onStatusRow,
  onSelectRow,
  onDeleteRow,
}) {
  const { user } = useAuth();

  const { userNames, busGasCode, busNumber, busPlates, driverName, driverPhoneNumber, endDate, startDate, status } =
    row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      {user.roleId === 'CUSTOMER' && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell align="left">{busNumber}</TableCell>
      <TableCell align="left">{busPlates}</TableCell>
      <TableCell align="left">{busGasCode}</TableCell>
      <TableCell align="left">{driverName}</TableCell>
      <TableCell align="left">{driverPhoneNumber}</TableCell>
      <TableCell align="left">{startDate}</TableCell>
      <TableCell align="left">{endDate}</TableCell>
      <TableCell align="left">{userNames.length !== 0 ? userNames : 'Not Yet'}</TableCell>
      <TableCell align="left">{status}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {user.roleId === 'CUSTOMER' && (
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
              )}
              {user.roleId === 'CUSTOMER' && (
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  Edit
                </MenuItem>
              )}
              {user.roleId === 'ADMIN' && (
                <MenuItem
                  onClick={() => {
                    onAssignRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'clarity:assign-user-solid'} />
                  Assign
                </MenuItem>
              )}
              {user.roleId === 'EMPLOYEE' && (
                <MenuItem
                  onClick={() => {
                    onStatusRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'material-symbols:task-alt-rounded'} />
                  Status
                </MenuItem>
              )}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
