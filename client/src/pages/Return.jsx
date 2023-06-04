import React,{useState,useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import moment from 'moment';

const Return = () => {
    const [showModal, setShowModal] = useState(false);
    const [returns, setReturn]  = useState([]);
    const toggleModal = () => {
        setShowModal(!showModal);
      };
      const [data,setData] = useState({
        studentid: "",
        firstname:"",
        middlename:"",
        lastname:"",
        course:"",
        returned:"",
        returndate:moment().toDate(),
        quantity:"",
     });
     
     const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'studentid') {
          const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 6);
          const firstPart = formattedValue.slice(0, 2);
          const secondPart = formattedValue.slice(2, 6);
          const formattedStudentId = `${firstPart}-${secondPart}`;
          setData({ ...data, [name]: formattedStudentId });
        } else {
          setData({ ...data, [name]: value });
        }
      };

     const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post('/api/return/submit', data) 
          .then((response) => {
            console.log(response.data); 
            setData({
              studentid: '',
              firstname: '',
              middlename: '',
              lastname: '',
              course: '',
              returned: '',
              returndate:'',
              quantity: '',
            });
            toggleModal();
           
            Swal.fire({
              icon: "success",
              title: "Book returned",
              text: "The book has been successfully returned.",
              showConfirmButton: true, 
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
  
      useEffect(() => {
        axios
          .get('/api/return/getall')
          .then((response) => {
            setReturn(response.data);
          })
          .catch((error) => {
            console.error(error);
            alert('Failed to fetch return books. Please try again.');
          });
      }, []);
     

    return (
            <div className='d-flex'>
            <Sidebar />
            <div className="container" style={{ height: '100vh' }}>
            <br/><br/>
        <div className="row">
          <div className="col">
            <Button color="primary" onClick={toggleModal}>
              <FaPlus /> Add new
            </Button>
          </div>
        </div>
      
        <table className="table">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student ID</th>
              <th scope="col">Name</th>
              <th scope="col">Course</th>
              <th scope="col">Book Title:</th>
              <th scope="col">Return Date:</th>
              <th scope = "col">Quantity</th>
            </tr>
          </thead>
          <tbody>
           
          {returns.map((returnss, index) => (
            <tr key={index}>
              <th scope="row">{index +1 }</th>
              <td>{returnss.studentid}</td>
              <td>{returnss.firstname} {returnss.middlename} {returnss.lastname}</td>
              <td>{returnss.course}</td>
              <td>{returnss.returned}</td>
              <td>{returnss.returndate}</td>
              <td>{returnss.quantity}</td>
            </tr>
               ))}
            
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Return</ModalHeader>
        <ModalBody>
        <form onSubmit={handleSubmit} >
          <div>
            <label>Student ID:</label>
            <input type="text" className="form-control" value={data.studentid}  name="studentid" onChange={handleChange} required/>
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" className="form-control" value={data.firstname}   onChange={(e) => setData({ ...data, firstname: e.target.value })} />
          </div>
          <div>
            <label>Middle Name:</label>
            <input type="text" className="form-control" value={data.middlename}   onChange={(e) => setData({ ...data, middlename: e.target.value })}/>
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" className="form-control" value={data.lastname}   onChange={(e) => setData({ ...data, lastname: e.target.value })}/>
          </div>
         <div>
         <label>Course:</label>
          <select className='form-control' value={data.course}   onChange={(e) => setData({ ...data, course: e.target.value })} required>
            <option>BSIT</option>
            <option>BSA</option>
            <option>BSP</option>
            <option>BSCS</option>
          </select>
        </div>
        <div>
         <label>Book Title:</label>
          <input type="text" className="form-control"  value={data.returned}   onChange={(e) => setData({ ...data, returned: e.target.value })} required/>
        </div>


        <div>
              <label>Date Return:</label>
              <DatePicker
                selected={data.returndate}
                onChange={(date) => setData({ ...data, returndate: date })}
                className="form-control"
                required/>
        </div>

        <div>
         <label>Quantity</label>
          <input type="number" min={0} className="form-control"  value={data.quantity}   onChange={(e) => setData({ ...data, quantity: e.target.value })} />
        </div>
        <br/>
        <div className='flex'>
            <Button color="secondary" onClick={toggleModal}  style={{ marginRight: '5px' }}>Close</Button>
            <Button color="primary" style={{ width: '65px' }}>Save</Button>
        </div>
         </form>
        </ModalBody>
      </Modal>
 </div>

    );
};

export default Return;