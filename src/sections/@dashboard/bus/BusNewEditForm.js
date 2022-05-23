import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// hook
import useBus from '../../../hooks/useBus';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

import useAuth from '../../../hooks/useAuth';

BusNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBus: PropTypes.object,
};

export default function BusNewEditForm({ isEdit, currentBus }) {
  const { user } = useAuth();
  const { addBus, editBus } = useBus();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewBusSchema = Yup.object().shape({
    busNumber: Yup.string().required('Bus number is required'),
    busPlates: Yup.string().required('Bus plates is required'),
    busGasCode: Yup.string().required('Bus Gas Code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      busNumber: currentBus?.busNumber || '',
      busPlates: currentBus?.busPlates || '',
      busGasCode: currentBus?.busGasCode || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBus]
  );

  const methods = useForm({
    resolver: yupResolver(NewBusSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentBus) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBus]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        data.busId = currentBus.id;
        await editBus({ data });
        reset();
      } else {
        data.customerId = user.id;
        await addBus({ data });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.bus.buslist);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="busNumber" label="Bus number" />
              <RHFTextField name="busPlates" label="Bus plates" />
              <RHFTextField name="busGasCode" label="Bus Gas Code" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Bus' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
