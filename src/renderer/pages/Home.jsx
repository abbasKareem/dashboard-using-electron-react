import {
  Button,
  createStyles,
  Grid,
  Group,
  Modal,
  UnstyledButton,
} from '@mantine/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  mybutton: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));
const Home = () => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div style={{ marginTop: '12px' }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <h1>test</h1>
      </Modal>
      <Group>
        <Button onClick={() => setOpened(true)} className={classes.mybutton}>
          Open Modal
        </Button>
      </Group>
    </div>
  );
};

export default Home;
