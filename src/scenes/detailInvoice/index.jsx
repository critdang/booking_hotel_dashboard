import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../components/Header';
import { Grid } from '@material-ui/core';
import { makeStyles, Table, TableBody, TableRow } from '@material-ui/core';
import { tokens } from './../../theme';
import { useTheme } from '@mui/material';
import RightSide from './RightSide';
import axios from 'axios';
import * as API from '../../constants/api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import DetailBreadcumb from '../../components/DetailBreadcumb';
import LeftSide from './LeftSide';
const useStyles = makeStyles({
  table: {
    border: '1px solid grey',
  },
  loading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const DetailInvoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();
  const { id } = useParams();
  const [data, setData] = React.useState();
  console.log('🚀 ~ file: index.jsx:39 ~ DetailInvoices ~ data:', data);

  useEffect(() => {
    axios
      .get(`${API.GET_ORDERS}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.message);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
  }, []);

  return (
    <>
      {!data ? (
        <div className={classes.loading}>
          {' '}
          <CircularProgress />
        </div>
      ) : (
        <>
          <Box m="20px">
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
            >
              <DetailBreadcumb data={data} />
              <Header title="Invoice" subtitle="Detail Invoice" />
              <Grid container spacing={3} justifyContent="space-evenly">
                <Grid item xs={12} md={7}>
                  <LeftSide data={data} />
                </Grid>
                <Grid item xs={12} md={3}>
                  <RightSide data={data} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
export default DetailInvoices;
