import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../redux/features/auth/authSlice';

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

const useStyles = createStyles((theme) => ({
  thePaper: {
    marginTop: '50px',
    width: 850,
    marginLeft: '30px',
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
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: 'pink',
  },
}));

const Rigster = () => {
  const type = 'rigster';
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      password2: '',
    },
    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  const { name, email, password, password2 } = form.values;

  const onsubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Loader size="xl" />;
  }

  return (
    <>
      <h1 className={classes.classes.theHeader}>Rigster</h1>
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
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue('name', event.currentTarget.value)
            }
            style={{ height: '100px' }}
          />

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
          <PasswordInput
            required
            label="Password2"
            placeholder="Confirm password"
            value={form.values.password2}
            onChange={(event) =>
              form.setFieldValue('password2', event.currentTarget.value)
            }
            error={
              form.errors.password2 &&
              'Password should include at least 6 characters'
            }
            style={{ height: '100px' }}
          />

          <Button className={classes.classes.submitButton} type="submit">
            {upperFirst(type)}
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Rigster;
