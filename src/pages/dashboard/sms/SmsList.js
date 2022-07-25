import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Card,
  Stack,
  Table,
  Switch,
  Typography,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import sendSms from '../../../hooks/useSms';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getUsers } from '../../../redux/slices/user';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../../../components/table';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// sections
import { SmsTableToolbar, SmsTableRow } from '../../../sections/@dashboard/sms/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phonNumber', label: 'Phone Number', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
];

// ----------------------------------------------------------------------

export default function SmsList() {
  const dispatch = useDispatch();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettings();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [isPeople, setIsPeople] = useState(false);

  const onSelectRow = (id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const SmsSchema = Yup.object().shape({
    phonenumber: Yup.string().required('Phone number is required'),
    sms: Yup.string().required('SMS is required'),
  });

  const defaultValues = {
    phonenumber: '',
    sms: '',
  };

  const methods = useForm({
    resolver: yupResolver(SmsSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const usersOfSite = {};
    if (selected.length) {
      usersOfSite.userId = selected;
      usersOfSite.sms = data.sms;
      sendSms(usersOfSite);
      reset();
    } else {
      usersOfSite.phonenumber = data.phonenumber;
      usersOfSite.sms = data.sms;
      sendSms(usersOfSite);
      reset();
    }
  };

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (users) {
      setTableData(users);
    }
  }, [users]);

  useEffect(() => {
    if (selected.length) {
      setValue('phonenumber', 'You can not input phone number if you select user in the table.');
      setIsPeople(true);
    } else {
      setIsPeople(false);
    }
  }, [selected]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  return (
    <Page title="SMS List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="SMS List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'SmsList' }]}
        />
        <Card>
          <SmsTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
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
                    <SmsTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
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
        <Card sx={{ mt: 5, p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ flex: '10', mb: 1 }}>
              <Typography sx={{ mb: '10px' }}>
                Please input phonenumber If you want to send someone who is not in the table.
              </Typography>
              {isPeople ? (
                <RHFTextField
                  disabled
                  name="phonenumber"
                  placeholder="You can not input phone number if you select user in the table."
                />
              ) : (
                <RHFTextField name="phonenumber" label="Phone number" placeholder="Phone Number" />
              )}
            </Stack>
            <Box sx={{ display: 'flex' }}>
              <Stack sx={{ flex: '10' }}>
                <RHFTextField name="sms" multiline rows={2} placeholder="Write a message..." />
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ ml: 2, flex: '2' }}
              >
                Send SMS
              </LoadingButton>
            </Box>
          </FormProvider>
        </Card>
      </Container>
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
