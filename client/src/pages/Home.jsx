import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [data, setData] = useState({
    booktitle: "",
    bookcategory: "",
    bookauthor: "",
    datepublished: "",
    quantity: "",
    left: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/book/submit', data)
      .then((response) => {
        console.log(response.data);
        setData({
          booktitle: '',
          bookcategory: '',
          bookauthor: '',
          datepublished: '',
          quantity: '',
          left: '',
        });
        toggleModal();

        Swal.fire({
          icon: "success",
          title: "Book Submitted",
          text: "The book has been successfully submitted.",
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
      .get('/api/book/getall')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch books. Please try again.');
      });
  }, []);

  const handleDelete = (bookId) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Book",
      text: "Are you sure you want to delete this book?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/book/delete/${bookId}`)
          .then((response) => {
            console.log(response.data);

            Swal.fire({
              icon: "success",
              title: "Book Deleted",
              text: "The book has been successfully deleted.",
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload();
            });

            setBooks(books.filter((book) => book.id !== bookId));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="d-flex">
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
              <th scope="col">Book Title</th>
              <th scope="col">Book Category</th>
              <th scope="col">Book Author</th>
              <th scope="col">Date Published</th>
              <th scope="col">Quantity</th>
              <th scope="col">Left</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{book.booktitle}</td>
                <td>{book.bookcategory}</td>
                <td>{book.bookauthor}</td>
                <td>{book.datepublished}</td>
                <td>{book.quantity}</td>
                <td>{book.left}</td>
                <td>
                  <button onClick={() => handleDelete(book._id)} className="btn btn-danger">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Item</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Book Title:</label>
              <input type="text" className="form-control" value={data.booktitle} onChange={(e) => setData({ ...data, booktitle: e.target.value })} required/>
            </div>
            <div>
              <label>Book Categories:</label>
              <select className='form-control' value={data.bookcategory} onChange={(e) => setData({ ...data, bookcategory: e.target.value })} required>
                <option>Adventure</option>
                <option>Classic</option>
                <option>Horror</option>
                <option>Fantasy</option>
                <option>History</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Book Author</label>
              <input type="text" className="form-control" value={data.bookauthor} onChange={(e) => setData({ ...data, bookauthor: e.target.value })} required />
            </div>

            <div>
              <label>Date Published</label>
              <DatePicker
                selected={data.datepublished}
                onChange={(date) => setData({ ...data, datepublished: date })}
                className="form-control"
              />
            </div>

            <div>
              <label>Quantity</label>
              <input type="number" min={0} className="form-control" value={data.quantity} onChange={(e) => setData({ ...data, quantity: e.target.value })} required/>
            </div>
            <div>
              <label>Left</label>
              <input type="number" min={0} className="form-control" value={data.left} onChange={(e) => setData({ ...data, left: e.target.value })} required/>
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

export default Home;
