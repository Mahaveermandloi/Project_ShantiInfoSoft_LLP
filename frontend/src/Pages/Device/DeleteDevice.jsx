// import React from "react";
// import { deleteApi } from "../../Utils/API";
// import { toast } from "react-toastify";

// const DeleteDevice = ({ closeModal, deviceId, setDevices }) => {
//   const handleDelete = async () => {
//     try {
//       const url = `/api/device/delete-device/${deviceId}`;
//       const response = await deleteApi(url);

//       if (response.statusCode === 200) {
//         toast.success("Device deleted successfully");
//         setDevices((prevDevices) =>
//           prevDevices.filter((device) => device._id !== deviceId)
//         );
//       } else {
//         toast.error(
//           response && response.data
//             ? response.data.message
//             : "Failed to delete device"
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting device:", error);
//       toast.error("An error occurred while deleting the device");
//     } finally {
//       closeModal(); // Close the modal whether delete succeeded or failed
//     }
//   };

//   return (
//     <>
//       <div className="absolute left-1/2 w-full transform -translate-x-1/2 bg-black bg-opacity-50 inset-0 flex items-center justify-center z-50">
//         <div className="bg-white rounded-md shadow-md p-4 w-72">
//           <h2 className="text-xl font-bold mb-4">Delete Device</h2>
//           <p className="mb-4">Are you sure you want to delete this Device?</p>
//           <div className="flex justify-end">
//             <button
//               onClick={closeModal}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DeleteDevice;

import React from "react";
import { deleteApi } from "../../Utils/API";
import { toast } from "react-toastify";

const DeleteDevice = ({ closeModal, deviceId, setDevices }) => {
  const handleDelete = async () => {
    try {
      const url = `/api/device/delete-device/${deviceId}`;
      const response = await deleteApi(url);

      if (response.statusCode === 200) {
        toast.success("Device deleted successfully");
        setDevices((prevDevices) =>
          prevDevices.filter((device) => device._id !== deviceId)
        );
      } else {
        toast.error(
          response && response.data
            ? response.data.message
            : "Failed to delete device"
        );
      }
    } catch (error) {
      console.error("Error deleting device:", error);
      toast.error("An error occurred while deleting the device");
    } finally {
      closeModal(); // Close the modal whether delete succeeded or failed
    }
  };

  return (
    <>
      <div className="absolute left-1/2 w-full transform -translate-x-1/2 bg-black bg-opacity-50 inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-md shadow-md p-4 w-72">
          <h2 className="text-xl font-bold mb-4">Delete Device</h2>
          <p className="mb-4">Are you sure you want to delete this Device?</p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDevice;
