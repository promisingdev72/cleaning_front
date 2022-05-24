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
import { getAllOrders } from '../../../redux/slices/order';
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

const TABLE_HEAD = [
  { id: 'busNumber', label: 'Bus Number', align: 'left' },
  { id: 'busPlates', label: 'Bus Plates', align: 'left' },
  { id: 'busGasCode', label: 'Bus Gas Code', align: 'left' },
  { id: 'driverName', label: 'Driver Name', align: 'left' },
  { id: 'driverPhoneNuber', label: 'Driver Phone Number', align: 'left' },
  { id: 'startDate', label: 'Start', align: 'left' },
  { id: 'endDate', label: 'End', align: 'left' },
  { id: 'assginEmployees', label: 'Assigned Employees', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function OrderList() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { deleteOrder } = useOrder();

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

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (orders) {
      if (user.roleId !== 'ADMIN') {
        const tempOrder = orders.filter((order) => Number(order.userId) === user.id);
        setTableData(tempOrder);
      } else {
        setTableData(orders);
      }
    }
  }, [orders]);

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    console.log('deleteId', id);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                  headLabel={TABLE_HEAD}
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
                      onAssignRow={() => handleClickOpen()}
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
      <SimpleDialog open={open} onClose={handleClose} />
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
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}
