import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const Borrow = () => {
    const [showModal, setShowModal] = useState(false);
    const [borrows, setBorrow]  = useState([]);
    const toggleModal = () => {
        setShowModal(!showModal);
      };
    const [data,setData] = useState({
       studentid: "",
       firstname:"",
       middlename:"",
       lastname:"",
       course:"",
       borrowed:"",
       borrowdate:moment().toDate(),
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
          .post('/api/borrow/submit', data) 
          .then((response) => {
            console.log(response.data); 
            setData({
              studentid: '',
              firstname: '',
              middlename: '',
              lastname: '',
              course: '',
              borrowed: '',
              borrowdate:'',
              quantity: '',
            });
            toggleModal();
           
            Swal.fire({
              icon: "success",
              title: "Book Borrowed",
              text: "The book has been successfully borrowed.",
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
          .get('/api/borrow/getall')
          .then((response) => {
            setBorrow(response.data);
          })
          .catch((error) => {
            console.error(error);
            alert('Failed to fetch borrowed books. Please try again.');
          });
      }, []);
     


    return (
        <div className='d-flex'>
            <Sidebar/>
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
              <th scope="col">Date Borrowed:</th>
              <th scope = "col">Quantity</th>
            </tr>
          </thead>
          <tbody>
           
          {borrows.map((borrow, index) => (
            <tr key={index}>
              <th scope="row">{index +1 }</th>
              <td>{borrow.studentid}</td>
              <td>{borrow.firstname} {borrow.middlename} {borrow.lastname}</td>
              <td>{borrow.course}</td>
              <td>{borrow.borrowed}</td>
              <td>{borrow.borrowdate}</td>
              <td>{borrow.quantity}</td>
            </tr>
               ))}
            
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Borrow</ModalHeader>
        <ModalBody>
        <form onSubmit={handleSubmit} >
          <div>
            <label>Student ID:</label>
            <input type="text" className="form-control" name="studentid" value={data.studentid}   onChange={handleChange} required/>
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" className="form-control" value={data.firstname}   onChange={(e) => setData({ ...data, firstname: e.target.value })} />
          </div>
          <div>
            <label>Middle Name:</label>
            <input type="text" className="form-control" value={data.middlename}   onChange={(e) => setData({ ...data, middlename: e.target.value }) } />
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
          <input type="text" className="form-control"  value={data.borrowed}   onChange={(e) => setData({ ...data, borrowed: e.target.value })} required/>
        </div>

        <div>
              <label>Date Borrowed:</label>
              <DatePicker
                selected={data.borrowdate}
                onChange={(date) => setData({ ...data, borrowdate: date })}
                className="form-control"
                required/>
        </div>

        <div>
         <label>Quantity:</label>
          <input type="number" min={0} className="form-control"  value={data.quantity}   onChange={(e) => setData({ ...data, quantity: e.target.value })} required/>
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

export default Borrow;