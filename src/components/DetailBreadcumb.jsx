import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Box, CssBaseline } from '@mui/material';
const theme = createTheme();

const DetailBreadcumb = (data) => {
  const dataInvoice = data.data;
  return (
    <Container
      maxWidth="lg"
      style={{
        pb: 5,
      }}
    >
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            to="/invoices"
            style={{ textDecoration: 'none' }}
          >
            <Typography color="text.primary">Invoices</Typography>
          </Link>
          <Typography color="text.primary">
            Invoice <b>#{dataInvoice.invoice.code}</b>
          </Typography>
        </Breadcrumbs>
      </div>
    </Container>
  );
};
export default DetailBreadcumb;
