import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme, IconButton } from '@mui/material';
import { tokens } from './../../theme';
import Header from './../../components/Header';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import * as API from '../../constants/api';
import axios from 'axios';
import CreateCategoryModal from './CategoryModal';
import { Delete, Edit } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import { toastAlertFail, toastAlertSuccess } from '../../utils/helperFn';
import 'react-toastify/dist/ReactToastify.css';

const Category = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedIdRow, setSelectedIdRow] = useState();
  const [typeModal, setTypeModal] = useState(null);

  const handleModalOpenWithParams = (type, params) => {
    const { id, createdAt, updatedAt, ...selectedRowData } = params.row;
    setSelectedIdRow(id);
    delete params.row.createdAt;
    delete params.row.updatedAt;
    setTypeModal(type);
    setSelectedRow(selectedRowData);
    setModal(true);
  };
  const handleModalCloseWithParams = () => {
    setModal(false);
  };

  const handleModalOpen = (type) => {
    setTypeModal(type);
    setModal(true);
  };

  // get all rooms by category at first render
  useEffect(() => {
    axios
      .get(`${API.GET_CATEGORY}`)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.message);
        }
      })
      .catch((error) => {
        console.error(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
  }, []);

  //[START] handle update UI
  const updateDeleteUI = (id) => {
    const validCategory = categories.filter((item) => item.id !== id);
    setCategories(validCategory);
  };

  const updateCreateUI = (newCategory) => {
    setCategories((prevState) => [...prevState, newCategory]);
  };

  const updateUI = (updatedCategory) => {
    console.log(
      '🚀 ~ file: index.jsx:73 ~ updateUI ~ updatedCategory:',
      updatedCategory
    );
    console.log('🚀 ~ file: index.jsx:83 ~ updateUI ~ categories:', categories);
    if (updatedCategory) {
      if (updatedCategory) {
        setCategories(
          categories.map((category) => {
            return category.id === updatedCategory.id
              ? updatedCategory
              : category;
          })
        );
      }
    }
  };

  //[END] handle update UI

  // [START] handle toast
  const handleToastFail = (message) => {
    toastAlertFail(message);
  };
  const handleToastSuccess = (message) => {
    toastAlertSuccess(message);
  };
  // [END] handle toast

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Category Name',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'thumbnail',
      headerName: 'Thumbnail',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: ({ row: { thumbnail } }) => {
        return (
          <img
            alt="thumbnail"
            src={thumbnail}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          ></img>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <div>
              <IconButton
                onClick={() => handleModalOpenWithParams('edit', params)}
              >
                <Edit sx={{ color: colors.blueAccent[500] }} />
              </IconButton>
              <IconButton
                onClick={() => handleModalOpenWithParams('delete', params)}
              >
                <Delete sx={{ color: colors.redAccent[500] }} />
              </IconButton>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <ToastContainer />
      <Box m="20px">
        <Header title="Category" subtitle="List of Categories" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => handleModalOpen('create')}
            >
              Create New Category
            </Button>
          </Box>
          <CreateCategoryModal
            type={typeModal}
            open={isModal}
            onClose={handleModalCloseWithParams}
            selectedRow={selectedRow}
            selectedIdRow={selectedIdRow}
            updateCreateUI={updateCreateUI}
            updateDeleteUI={updateDeleteUI}
            updateUI={updateUI}
            handleToastFail={handleToastFail}
            handleToastSuccess={handleToastSuccess}
            setLoading={setLoading}
          />
          <DataGrid
            rows={categories}
            key={categories.id}
            getRowId={(row) => row.id}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};
export default Category;
