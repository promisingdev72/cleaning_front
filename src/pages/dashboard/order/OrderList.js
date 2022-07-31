/* eslint-disable array-callback-return */
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getAllOrders, getAssignedOrders } from '../../../redux/slices/order';
import { getAssignEmployees } from '../../../redux/slices/assign';

// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import useOrder from '../../../hooks/useOrder';

// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
import SimpleDialog from '../../../components/SimpleDialog';

import useAuth from '../../../hooks/useAuth';

// sections
import { OrderTableToolbar, OrderTableRow } from '../../../sections/@dashboard/order/list';

// ----------------------------------------------------------------------

const TABLE_HEAD1 = [
  { id: 'clientName', label: 'Client', align: 'left' },
  { id: 'busNumber', label: 'BUS', align: 'left' },
  { id: 'busPlates', label: 'Bus Plates', align: 'left' },
  { id: 'busGasCode', label: 'Gas Code', align: 'left' },
  { id: 'driverName', label: 'Driver', align: 'left' },
  { id: 'driverPhoneNuber', label: 'Phone', align: 'left' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'assginEmployees', label: 'Assigned Employees', align: 'left' },
  { id: 'status', label: 'Task Status', align: 'left' },
  { id: '' },
];
const TABLE_HEAD2 = [
  { id: 'clientName', label: 'Client', align: 'left' },
  { id: 'busNumber', label: 'BUS', align: 'left' },
  { id: 'busGasCode', label: 'Gas Code', align: 'left' },
  { id: 'program', label: 'Program', align: 'left' },
  { id: 'startDate', label: 'Start Date', align: 'left' },
  { id: 'endDate', label: 'End Date', align: 'left' },
  { id: 'status', label: 'Task Status', align: 'left' },
  { id: '' },
];
// ----------------------------------------------------------------------

export default function OrderList() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { addStatus, deleteOrder, addStatus2 } = useOrder();
  const [isFlag, setIsFlag] = useState();
  const [assignEmployees, setAssignEmployeeList] = useState([]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);
  const { assignes } = useSelector((state) => state.assign);
  const { assignedOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAssignedOrders(user.id));
  }, [dispatch, isFlag]);

  useEffect(() => {
    if (assignes) {
      setAssignEmployeeList(assignes);
    }
  }, [assignes]);

  const [tableData, setTableData] = useState([]);
  // const date = new Date();
  // const today = date.toUTCString().slice(0, 16);
  // const yesterday = new Date(date);
  // yesterday.setDate(yesterday.getDate() - 1);

  useEffect(() => {
    if (orders) {
      if (user.roleId === 'ADMIN') {
        setTableData(orders);
      } else if (user.roleId === 'CUSTOMER') {
        const tempOrder = orders.filter((order) => Number(order.userId) === user.id);
        setTableData(tempOrder);
      }
    }
    if (assignedOrders) {
      if (user.roleId === 'EMPLOYEE') {
        const tempAssignOrders = assignedOrders.filter(
          (assignedOrder) =>
            // (new Date(assignedOrder.startDate).toUTCString().slice(0, 16) === today ||
            //   new Date(assignedOrder.startDate).toUTCString().slice(0, 16) === yesterday) &&
            assignedOrder.status !== 'complete'
        );
        setTableData(tempAssignOrders);
      }
    }
  }, [orders, assignedOrders]);

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    deleteOrder(id);
    enqueueSnackbar('Success Deleted!');
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
    deleteOrder(selected);
    enqueueSnackbar('Success Deleted!');
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.task.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssign = (orderId) => {
    dispatch(getAssignEmployees(orderId));
    setOpen(true);
    setOrderId(orderId);
  };

  const handleStatus = (orderId, status) => {
    const statusData = {
      orderId,
      status,
      userId: user.id,
    };
    addStatus({ statusData });
    setIsFlag(!isFlag);
  };

  const handleStatus2 = (orderId, status) => {
    const statusData = {
      orderId,
      status,
    };
    addStatus2({ statusData });
    setIsFlag(!isFlag);
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title="Task List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Task List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'TaksList' }]}
          action={
            user.roleId === 'CUSTOMER' && (
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.task.new}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                New Task
              </Button>
            )
          }
        />

        <Card>
          <OrderTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={user.roleId !== 'EMPLOYEE' ? TABLE_HEAD1 : TABLE_HEAD2}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <OrderTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onAssignRow={() => handleAssign(row.id)}
                      onStatusRow={(status) => handleStatus(row.id, status)}
                      onStatusRow2={(status) => handleStatus2(row.id, status)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.busNumber)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
      <SimpleDialog open={open} onClose={handleClose} orderId={orderId} assignEmployees={assignEmployees} />
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.busNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}
