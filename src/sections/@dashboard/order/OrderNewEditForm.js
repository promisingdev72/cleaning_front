import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBuses } from '../../../redux/slices/bus';
import { getDrivers } from '../../../redux/slices/driver';
// hook
import useAuth from '../../../hooks/useAuth';
import useOrder from '../../../hooks/useOrder';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

OrderNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentOrder: PropTypes.object,
};

export default function OrderNewEditForm({ isEdit, currentOrder }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange1 = (startDate) => {
    setStartDate(startDate.toString().slice(0, 21));
  };
  const [endDate, setEndDate] = useState(new Date());

  const handleChange2 = (endDate) => {
    setEndDate(endDate.toString().slice(0, 21));
  };

  const { addOrder, editOrder } = useOrder();

  const { user } = useAuth();

  const [buslist, setBusList] = useState([]);
  const [driverlist, setDriverList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBuses(user.id));
    dispatch(getDrivers(user.id));
  }, [dispatch]);

  const { buses } = useSelector((state) => state.bus);
  const { drivers } = useSelector((state) => state.driver);

  useEffect(() => {
    if (buses && drivers) {
      setBusList(buses);
      setDriverList(drivers);
    }
  }, [buses, drivers]);

  useEffect(() => {
    if (currentOrder && currentOrder.startDate) {
      const tmpStartDate = currentOrder.startDate.split('.')[0];
      const tmpEndDate = currentOrder.endDate.split('.')[0];
      const startDate = `${tmpStartDate}`;
      const endDate = `${tmpEndDate}`;
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
    }
  }, [currentOrder]);

  const programs = [
    { id: 1, name: 'Program1' },
    { id: 2, name: 'Program2' },
    { id: 3, name: 'Program3' },
    { id: 4, name: 'Program4' },
  ];

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewOrderSchema = Yup.object().shape({
    bus: Yup.string().required('Bus is required'),
    program: Yup.string().required('Program is required'),
    driver: Yup.string().required('Driver is required'),
  });

  const defaultValues = useMemo(
    () => ({
      bus: currentOrder?.busNumber || '',
      program: currentOrder?.program || '',
      driver: currentOrder?.driverName || '',
    }),
    [currentOrder]
  );

  const methods = useForm({
    resolver: yupResolver(NewOrderSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentOrder) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentOrder]);

  const onSubmit = async (data) => {
    try {
      const currentBusDetail = buslist.find((bus) => bus.busNumber === data.bus);
      const currentDriverDetail = driverlist.find((driver) => driver.driverName === data.driver);
      const currentDateDetail = {
        startDate,
        endDate,
      };
      console.log('currentDateDetail', currentDateDetail);

      const currentUserId = {
        customerId: user.id,
      };

      const program = {
        program: data.program,
      };

      const resData = {
        ...currentBusDetail,
        ...currentDriverDetail,
        ...currentDateDetail,
        ...currentUserId,
        ...program,
      };

      if (isEdit) {
        const currentOrderId = {
          orderId: currentOrder.id,
        };
        const resData = {
          ...currentBusDetail,
          ...currentDriverDetail,
          ...currentDateDetail,
          ...currentUserId,
          ...currentOrderId,
          ...program,
        };
        await editOrder({ resData });
        reset();
      } else {
        await addOrder({ resData });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.task.tasklist);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} sx={{ margin: '0 auto' }}>
          <Card sx={{ p: 3 }}>
            <Box>
              <RHFSelect name="bus" label="Bus" placeholder="Bus" sx={{ mt: 3 }}>
                <option value="" />
                {buslist.map((bus) => (
                  <option key={bus.id} value={bus.busNumber}>
                    {bus.busNumber}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="program" label="Program" placeholder="Program" sx={{ mt: 3 }}>
                <option value="" />
                {programs.map((program) => (
                  <option key={program.id} value={program.name}>
                    {program.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="driver" label="Driver" placeholder="Driver" sx={{ mt: 3 }}>
                <option value="" />
                {driverlist.map((driver) => (
                  <option key={driver.id} value={driver.driverName}>
                    {driver.driverName}
                  </option>
                ))}
              </RHFSelect>
              <Box m={3} />
              <Stack spacing={3}>
                <DateTimePicker
                  label="Start Date"
                  value={startDate}
                  name="startDate"
                  ampm={false}
                  onChange={handleChange1}
                  renderInput={(params) => <RHFTextField {...params} />}
                />
                <DateTimePicker
                  label="End Date"
                  value={endDate}
                  name="endDate"
                  ampm={false}
                  onChange={handleChange2}
                  renderInput={(params) => <RHFTextField {...params} />}
                />
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create order' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
