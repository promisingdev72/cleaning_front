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
  onStatusRow2: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function OrderTableRow({
  row,
  selected,
  onEditRow,
  onAssignRow,
  onStatusRow,
  onStatusRow2,
  onSelectRow,
  onDeleteRow,
}) {
  const { user } = useAuth();

  const {
    clientNames,
    userNames,
    busGasCode,
    busNumber,
    busPlates,
    driverName,
    driverPhoneNumber,
    endDate,
    startDate,
    status,
    program,
  } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      {user.roleId !== 'EMPLOYEE' && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}
      <TableCell align="left" sx={{ minWidth: '100px' }}>
        {clientNames}
      </TableCell>
      <TableCell align="left" sx={{ minWidth: '100px' }}>
        {busNumber}
      </TableCell>
      {user.roleId !== 'EMPLOYEE' && <TableCell align="left">{busPlates}</TableCell>}
      <TableCell align="left">{busGasCode}</TableCell>
      {user.roleId !== 'EMPLOYEE' && (
        <>
          <TableCell align="left">{driverName}</TableCell>
          <TableCell align="left" sx={{ minWidth: '150px' }}>
            {driverPhoneNumber}
          </TableCell>
        </>
      )}
      {user.roleId === 'EMPLOYEE' && <TableCell align="left">{program}</TableCell>}
      <TableCell align="left" sx={{ minWidth: '180px' }}>
        {new Date(startDate).toString().slice(0, 21)}
      </TableCell>
      <TableCell align="left" sx={{ minWidth: '180px' }}>
        {new Date(endDate).toString().slice(0, 21)}
      </TableCell>
      {user.roleId !== 'EMPLOYEE' && (
        <TableCell align="left">{userNames.length !== 0 ? userNames.join(' ') : 'Not Yet'}</TableCell>
      )}
      <TableCell align="left">{status}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {user.roleId !== 'EMPLOYEE' && (
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
                <>
                  <MenuItem
                    onClick={() => {
                      onAssignRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'clarity:assign-user-solid'} />
                    Assign
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onStatusRow2('pending');
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'ic:baseline-history'} />
                    Pending
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onStatusRow2('in progress');
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'cil:av-timer'} />
                    In Progress
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onStatusRow2('complete');
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'material-symbols:task-alt-rounded'} />
                    Complete
                  </MenuItem>
                </>
              )}
              {user.roleId === 'EMPLOYEE' && (
                <>
                  <MenuItem
                    onClick={() => {
                      onStatusRow('pending');
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'ic:baseline-history'} />
                    Pending
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onStatusRow('in progress');
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'cil:av-timer'} />
                    In Progress
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onStatusRow('complete');
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'material-symbols:task-alt-rounded'} />
                    Complete
                  </MenuItem>
                </>
              )}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
