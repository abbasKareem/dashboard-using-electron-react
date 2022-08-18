import React, { useEffect } from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Center,
  createStyles,
  Loader,
} from '@mantine/core';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../redux/features/auth/authSlice';

const useStyles = createStyles((theme) => ({
  thePaper: {
    marginTop: '50px',
    width: 850,
    marginLeft: '30px',

    '@media (max-width: 800px)': {
      width: '600px',
    },
  },
  title: {
    marginTop: '20px',
  },
  theDivider: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  theHeader: {
    fontSize: '50px',
    marginLeft: '30px',
    color: '#0096FF',
  },
  matine: {
    color: '#0096FF',
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    marginTop: '40px',
    marginBottom: '40px',
    backgroundColor: 'pink',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '30%',
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const classes = useStyles();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  const { email, password } = form.values;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onsubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loader size="xl" />;
  }

  return (
    <>
      <h1 className={classes.classes.theHeader}>Login</h1>
      <Paper shadow="xl" p="md" className={classes.classes.thePaper}>
        <Text size="lg" weight={500} className={classes.classes.title}>
          Welcome to <span className={classes.classes.matine}>Mantine</span>
        </Text>

        <Divider
          label="Fill the form"
          labelPosition="center"
          className={classes.classes.theDivider}
        />

        <form onSubmit={onsubmit}>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            style={{ height: '100px' }}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
            style={{ height: '100px' }}
          />

          <Button className={classes.classes.submitButton} type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Login;
