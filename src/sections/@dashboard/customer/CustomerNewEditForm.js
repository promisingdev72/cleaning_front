/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
// Hook
import useCustomer from '../../../hooks/useCustomer';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

CustomerNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCustomer: PropTypes.object,
};

export default function CustomerNewEditForm({ isEdit, currentCustomer }) {
  const { editCustomer, addCustomer } = useCustomer();
  const ROLES = ['ADMIN', 'EMPLOYEE', 'CUSTOMER'];
  const ROLES_INIT = { ADMIN: 1, EMPLOYEE: 2, CUSTOMER: 3 };
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewCustomerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    password: !isEdit ? Yup.string().required('Password is required') : '',
    role: Yup.string().required('Role is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCustomer?.name || '',
      email: currentCustomer?.email || '',
      password: '',
      avatarUrl: currentCustomer?.avatarUrl || '',
      role: ROLES_INIT[currentCustomer?.roles] || '1',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCustomer]
  );

  const methods = useForm({
    resolver: yupResolver(NewCustomerSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentCustomer) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCustomer]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await editCustomer({ data });
        reset();
      }
      await addCustomer({ data });
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.customer.customerlist);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              {isEdit && (
                <RHFSelect name="role" label="Roles" placeholder="Roles">
                  {ROLES.map((option, index) => (
                    <option key={index} value={index + 1}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
              )}
              {!isEdit && (
                <RHFTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Customer' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
