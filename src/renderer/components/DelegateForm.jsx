import {
  Button,
  createStyles,
  Grid,
  Input,
  Loader,
  NumberInput,
  Paper,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { setLogger, useMutation, useQueryClient } from 'react-query';
import { addDelegate } from 'renderer/query/query';
import { IconSquarePlus } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '50px',
    paddingTop: '20px',
    flexDirection: 'column',
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
    marginBottom: '20px',
  },
}));

const DelegateForm = () => {
  const queryClient = useQueryClient();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [almudhakher, setAlmudhakher] = useState('');

  const { mutateAsync, isLoading, isError } = useMutation(addDelegate);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !city || !almudhakher) {
      toast.error(t('please_fill_the_form'));
    } else {
      try {
        await mutateAsync({ name, phone, email, city, almudhakher });
        queryClient.invalidateQueries('delegates');
      } catch (error) {
        toast.error('error from the add Delegate...');
      }
      setName('');
      setPhone('');
      setEmail('');
      setCity('');
      setAlmudhakher('');
    }
  };

  return (
    <Paper>
      <div className={classes.classes.wrapper}>
        {isError && <div>Something went wrong...</div>}
        <form onSubmit={onSubmit}>
          <Grid grow>
            <Grid.Col md={2} lg={2}>
              <TextInput
                size="md"
                radius="lg"
                className={classes.classes.inputFiled}
                label="Name *"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col md={2} lg={2}>
              <TextInput
                size="md"
                radius="lg"
                className={classes.classes.inputFiled}
                label="Phone *"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col md={2} lg={2}>
              <TextInput
                size="md"
                radius="lg"
                className={classes.classes.inputFiled}
                label="Email *"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col md={2} lg={2}>
              <TextInput
                size="md"
                radius="lg"
                className={classes.classes.inputFiled}
                label="City *"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col md={2} lg={2}>
              <TextInput
                size="md"
                radius="lg"
                className={classes.classes.inputFiled}
                label="Almudhakher *"
                placeholder="Almudhakher"
                value={almudhakher}
                onChange={(e) => setAlmudhakher(e.target.value)}
              />
            </Grid.Col>
          </Grid>

          <div className={classes.classes.button}>
            <Button
              type="submit"
              sx={{
                width: '20%',
                height: '40px',
                fontSize: '30px',
                fontFamily: 'inherit',
                // fontStyle: 'italic',
              }}
              variant="outline"
            >
              {isLoading ? (
                <Loader color="dark" />
              ) : (
                <div>
                  <IconSquarePlus style={{ marginRight: '10px' }} />
                  {t('submit_the_form')}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Paper>
  );
};

export default DelegateForm;
