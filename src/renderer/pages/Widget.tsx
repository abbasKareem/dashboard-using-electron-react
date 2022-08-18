import { Grid } from '@mantine/core';
import './widgets.scss';
const Widget = () => {
  return (
    <Grid gutter="md" align="center" justify="center" className="container">
      <Grid.Col sm={3} className="item">
        1
      </Grid.Col>
      <Grid.Col sm={3} className="item">
        2
      </Grid.Col>
      <Grid.Col sm={3} className="item">
        3
      </Grid.Col>
      <Grid.Col sm={3} className="item">
        4
      </Grid.Col>
    </Grid>
  );
};

export default Widget;
