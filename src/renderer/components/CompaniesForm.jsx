import {
  Button,
  createStyles,
  Grid,
  Input,
  Loader,
  NumberInput,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { useMutation, useQueryClient } from 'react-query';
import { addCompany } from 'renderer/query/query';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '50px',
    paddingTop: '20px',
  },
  inputFiled: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
}));

const CompainesForm = () => {
  const queryClient = useQueryClient();
  const classes = useStyles();

  const [manger_name, setManagerName] = useState('');
  const [name, setName] = useState('');

  const { mutateAsync, isLoading, isError } = useMutation(addCompany);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !manger_name) {
      toast.error(t('please_fill_the_form'));
    } else {
      try {
        await mutateAsync({ name, manger_name });
        queryClient.invalidateQueries('companies');
      } catch (error) {
        toast.error('error from the add company...');
      }
      setManagerName('');
      setName('');
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader size="xl" stroke />
      </div>
    );
  }
  return (
    <div className={classes.classes.wrapper}>
      {isError && <div>Something went wrong...</div>}
      <form onSubmit={onSubmit}>
        <Grid grow>
          <Grid.Col md={3} lg={3}>
            <Input
              size="lg"
              radius="lg"
              className={classes.classes.inputFiled}
              label="Name"
              placeholder={t('company_name_column')}
              description="This Field is required"
              value={manger_name}
              onChange={(e) => setManagerName(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Input
              size="lg"
              radius="lg"
              className={classes.classes.inputFiled}
              label="Name"
              placeholder={t('company_manager_name_column')}
              description="This Field is required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid.Col>
        </Grid>

        <div className={classes.classes.button}>
          <Button
            type="submit"
            sx={{
              width: '30%',
              height: '40px',
              fontSize: '30px',
              fontFamily: 'inherit',
              // fontStyle: 'italic',
            }}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            {t('submit_the_form')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompainesForm;
