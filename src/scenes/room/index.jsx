import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from './../../theme';
import Header from './../../components/Header';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import * as API from '../../constants/api';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { toastAlertFail, toastAlertSuccess } from '../../utils/helperFn';
import RoomModal from './RoomModal';
import { ToastContainer } from 'react-toastify';

const Room = ({ setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rooms, setRooms] = useState([]);
  const [isModal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedIdRow, setSelectedIdRow] = useState();

  const [typeModal, setTypeModal] = useState(null);
  // HANDLE DELETE ROOM

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

  // HANDLE CREATE ROOM
  const handleModalOpen = (type) => {
    setTypeModal(type);
    setModal(true);
  };

  // get all rooms by category
  useEffect(() => {
    axios
      .get(`${API.GET_ROOMS}`)
      .then((res) => {
        if (res.data.success) {
          setRooms(res.data.message);
        }
      })
      .catch((error) => {
        console.log(
          '🚀 ~ file: room-body.component.jsx ~ line 124 ~ handleSubmitRoom ~ error',
          error
        );
      });
  }, []);

  // handle update UI
  const updateDeleteUI = (id) => {
    const validRoom = rooms.filter((item) => item.id !== id);
    setRooms(validRoom);
  };

  const updateCreateUI = (newRoom) => {
    setRooms((prevState) => [...prevState, newRoom]);
  };

  const updateUI = (updatedRoom) => {
    if (updatedRoom) {
      if (updatedRoom) {
        setRooms(
          rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
        );
      }
    }
  };

  // handle toast
  const handleToastFail = (message) => {
    toastAlertFail(message);
  };
  const handleToastSuccess = (message) => {
    toastAlertSuccess(message);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'name',
      headerName: 'Room Name',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'detail',
      headerName: 'Detail',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'hot',
      headerName: 'Hot',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'adult',
      headerName: 'Adult',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'kid',
      headerName: 'Kid',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'categoryId',
      headerName: 'CategoryId',
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
              {/* <IconButton onClick={() => handleDelete(params.id)}> */}
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
    <Box m="20px">
      <Header title="Room" subtitle="List of Rooms" />
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
            Create New Room
          </Button>
        </Box>
        <RoomModal
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
          key={rooms.id}
          getRowId={(row) => row.id}
          rows={rooms}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <ToastContainer />
      </Box>
    </Box>
  );
};
export default Room;
