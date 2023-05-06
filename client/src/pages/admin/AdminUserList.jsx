import { useState, useEffect, useRef } from "react";

import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";
import {
  MdCancel,
  MdDeleteForever,
  MdOutlineHistoryEdu,
  MdPersonRemoveAlt1,
} from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { FaUserAstronaut } from "react-icons/fa";

export default function AdminUserList() {
  //state
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/allusers");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`/users/${selectedUserId}`);
      if (response.status === 200) {
        // Show a success message with the user's first name
        toast.success("Deleted user successfully!");
        setIsDialogOpen(false);
        setUsers(users.filter((u) => u._id !== selectedUserId));
        setSelectedUserId(null);
      } else {
        console.log("Error deleting user");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const componentRef = useRef(null);

  return (
    <>
      <div className="px-10 py-5 bg-gray-200 h-screen font-bebas">
        <div className="flex justify-between mb-2">
          <ReactToPrint
            trigger={() => {
              return (
                <button className="flex items-center gap-1 hover:text-orange-500">
                  <BiPrinter fontSize={25} />
                  print User list
                </button>
              );
            }}
            content={() => componentRef.current}
            documentTitle="Print Order History"
            pageStyle="print"
          />
        </div>

        <div>
          <Paper>
            <div className="py-2 px-4 bg-white border-b">
              <strong className="text-3xl text-black tracking-wider flex items-center gap-1">
                User List <FaUserAstronaut className="text-[#D2B48C]" />
              </strong>
            </div>

            <div className="p-4 bg-white">
              <table className="w-[100%] border" ref={componentRef}>
                <thead className="border-b text-left bg-gray-100">
                  <tr className="text-xl tracking-wide">
                    <th className="p-2">User Id</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone Number</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>

                <tbody>
                  {users?.map((u) => (
                    <tr key={u._id} className="border-b">
                      <td className="p-3">{u._id}</td>
                      <td className="p-3">
                        {u.lastname}, {u.firstname}
                      </td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.contactnum}</td>

                      <td className="p-3">
                        <button
                          onClick={() => {
                            setIsDialogOpen(true);
                            setSelectedUserId(u._id);
                          }}
                          className="text-white py-2 px-5 bg-red-500 rounded-sm font-bold tracking-widest flex items-center gap-1"
                        >
                          <MdPersonRemoveAlt1 />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>
        </div>
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          <span className="font-bebas font-bold">
            Are You Sure You Want To Delete This User?
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="flex items-center gap-3 font-bebas">
              <IoWarning fontSize={80} className="text-red-500" />
              <div>
                Deleting this user will permanently remove all their data. This
                action cannot be undone.
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsDialogOpen(false)}
            startIcon={<MdCancel />}
          >
            <span className="font-bebas font-bold text-lg tracking-widest">
              Cancel
            </span>
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={handleDeleteUser}
            autoFocus
            startIcon={<MdDeleteForever />}
          >
            <span className="font-bebas font-bold text-lg tracking-widest">
              Delete
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
