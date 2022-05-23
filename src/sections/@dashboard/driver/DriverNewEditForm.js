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
import useDriver from '../../../hooks/useDriver';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

import useAuth from '../../../hooks/useAuth';

DriverNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentDriver: PropTypes.object,
};

export default function DriverNewEditForm({ isEdit, currentDriver }) {
  const { user } = useAuth();
  const { addDriver, editDriver } = useDriver();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewDriverSchema = Yup.object().shape({
    driverName: Yup.string().required('Driver name is required'),
    driverPhoneNumber: Yup.string().required('Driver Phone Number numbers is required'),
  });

  const defaultValues = useMemo(
    () => ({
      driverName: currentDriver?.driverName || '',
      driverPhoneNumber: currentDriver?.driverPhoneNumber || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(NewDriverSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentDriver) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentDriver]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        data.driverId = currentDriver.id;
        await editDriver({ data });
        reset();
      } else {
        data.customerId = user.id;
        await addDriver({ data });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.driver.driverlist);
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
              <RHFTextField name="driverName" label="Driver Name" />
              <RHFTextField name="driverPhoneNumber" label="Driver Phone Number" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Driver' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
