import React, { useState ,useEffect} from "react";
import "./AdminDashboard.css"; // Import CSS styles for the component
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import {Form, Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
const AdminDeleteBooks = () => {
    const navigate = useNavigate();
    //   data add t obackend
    const [email , setEmail] = useState("");
const [status , setStatus] = useState("");
const [returnsDate, setReturnsDate] = useState('');
const [returnTime, setReturnTime] = useState('');
const[totalBooks ,setTotalBooks]  =useState(0)



//  sending book details
const handleSubmit = async (e) => {
  e.preventDefault();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  setReturnsDate(formattedDate)
  const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
  setReturnTime(formattedTime)
  try {
    const response = await axios.post('http://localhost:4556/deletebooks', {
      email:email,
      status:status,
      returnDate: formattedDate,
      returnTime: formattedTime
    });
    console.log(response.data);
    if (response.status === 200) { // Check response status instead of data code
      navigate('/admin/student');
    } else {
      console.log('Error adding book.');
    }
  } catch (error) {
    console.error('Error adding book:', error);
    console.log('Internal Server Error.');
  }
};



  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <IoBookSharp
                  size={30}
                  color="#2a2185"
                  style={{ position: "relative", top: "17px", left: "30px" }}
                />
              </span>
              <span className="title">
                <h1 style={{ fontSize: "25px" }}>Admin</h1>
              </span>
            </a>
          </li>
          <li>
           < Link to="/admin">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/student">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Students</span>
            </Link>
          </li>
          <li>
            <Link  to="/admin/attendence">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span className="title">Attendence</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/books">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Books</span>
            </Link>
          </li>
         
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>
          <div
            className="flex-none"
            style={{ position: "absolute", left: "77%" }}
          >
            
          </div>
          <Link to='/' ><button style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'-200px' ,textAlign:'center',top:'-7px', fontSize:'20px' ,color:'black' }}>Logout</button></Link>
        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1000</div>
              <div className="cardName">Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{totalBooks}</div>
              <div className="cardName">Books</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">5</div>
              <div className="cardName">Today Issued Books </div>
            </div>
            <div className="iconBx"></div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">11</div>
              <div className="cardName">Todays Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Add Book</h2>
              
            </div>

            <div style={{position:'relative',top:'-40px',left:'20%'}}>
						<form className="form_container" onSubmit={handleSubmit}>
                            {/* email */}
                        <input
								type="text"
								placeholder="Email"
								name="email"
								onChange={(e)=>{
								setEmail(e.target.value)
								}}
								value={email}
								required
								className="input"
							/>
							{/* status */}
                            <select className="input" name="status" id="status" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                            <option >Student Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Return">Return</option>
                            </select>

							<button type="submit" className="btn">
								Delete Book
							</button>
						</form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteBooks;
