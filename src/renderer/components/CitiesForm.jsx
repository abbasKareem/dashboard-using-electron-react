import {
  Button,
  createStyles,
  Grid,
  Input,
  NumberInput,
  TextInput,
} from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createCity } from '../redux/features/cities/citiesSlice';
import { t } from 'i18next';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '50px',
    paddingTop: '20px',
    // paddingBottom: '10px',
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

const CitiesForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [census, setCensus] = useState();
  const [city_code, setCity_code] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    Number(census);
    Number(city_code);
    console.log(typeof census);
    if (!name || !census || !city_code) {
      toast.error(t('please_fill_the_form'));
    } else {
      dispatch(createCity({ name, census, city_code }));
      setName('');
      setCensus('');
      setCity_code('');
    }
  };
  return (
    <div className={classes.classes.wrapper}>
      <form onSubmit={onSubmit}>
        <Grid grow>
          <Grid.Col md={3} lg={3}>
            <Input
              size="lg"
              radius="lg"
              className={classes.classes.inputFiled}
              label="Name"
              placeholder={t('enter_name')}
              description="This Field is required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Input
              type="number"
              size="lg"
              radius="lg"
              className={classes.classes.inputFiled}
              label="Name"
              placeholder={t('enter_census')}
              description="This Field is required"
              value={census}
              onChange={(e) => setCensus(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Input
              type="number"
              size="lg"
              radius="lg"
              className={classes.classes.inputFiled}
              label="Name"
              placeholder={t('enter_city_code')}
              description="This Field is required"
              value={city_code}
              onChange={(e) => setCity_code(e.target.value)}
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

export default CitiesForm;
