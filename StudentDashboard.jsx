import React ,{useState ,useEffect} from "react";
import "./StudentDashboard.css";
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import axios from 'axios'
import { Link, useLocation ,useNavigate  } from "react-router-dom";

const StudentDashboard = () => {
  const userEmail = localStorage.getItem("userEmail");
  const location = useLocation();
  const userEmailFromUrl = new URLSearchParams(location.search).get("email");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [qrcode, setQrcode] = useState("");
  const [logoutDate, setLogoutDate] = useState("");
  const [logoutTime, setLogoutTime] = useState("");

  // Fetching only the logged-in user's data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4556/userdata?email=${userEmail}`
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          const user = response.data.find((user) => user.email === userEmail);
          if (user) {
            setUserData(user);
            setQrcode(
              `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userEmail}`
            );
          } else {
            console.log("User data not found.");
          }
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userEmail]);



  const handleLogout = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" + (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
      "0" + currentDate.getMinutes()
    ).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
    setLogoutDate(formattedDate);
    setLogoutTime(formattedTime);
    const email = userEmail || userEmailFromUrl;
  
    try {
      const response = await axios.post("http://localhost:4556/logoutdatetime", {
        email: email,
        logoutDate: formattedDate,
        logoutTime: formattedTime,
      });
      console.log("Logout Response:", response.data); // Log the response data
  
      if (response.data.code === 200) {
        navigate("/");
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("EMAIL");
      } else {
        console.log("Logout failed: Unexpected response code");
        navigate("/");
      }
    } catch (err) {
      console.log("Error sending logout data", err);
      console.log("Logout failed: Request error");
      navigate("/");
    }
  };
  return (
    <div className="container" >
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
              <IoBookSharp size={30} color='#2a2185' style={{position:'relative',top:'17px',left:'30px'}} />
              </span>
              <span className="title"><h1 style={{fontSize:'25px'}}>Student </h1></span>
            </a>
          </li>
          <li>
          <Link to={`/student?email=${userEmailFromUrl}`}>
  <span className="icon">
    <ion-icon name="home-outline"></ion-icon>
  </span>
  <span className="title">Dashboard</span>
</Link>
          </li>
          <li>
            <Link to={`/student/attendence?email=${userEmailFromUrl}`}>
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Attendence</span>
            </Link>
          </li>
          <li>
            <Link to={`/student/books?email=${userEmailFromUrl}`}>
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
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
          <div className="flex-none" style={{position:'absolute',left:'75%'}}>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
        <HiMiniBellAlert  size={30} color="rgba(113, 99, 186, 255)"/>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Link to='/' ><button onClick={handleLogout} style={{background:'rgba(113, 99, 186, 255)', width:'80px',height:'40px',borderRadius:'10px',position:'relative', left:'-150px' ,textAlign:'center',top:'-7px', fontSize:'20px' ,color:'black' }}>Logout</button></Link>

        </div>

        <div className="cardBox" >
         
         
          <div className="card"style={{position:'relative', left:'80%'}}>
            <div>
              <div className="numbers">{userData.loginTime || 0}</div>
              <div className="cardName">In Time</div>
            </div>
            <div className="iconBx">
            
            </div>
          </div>
          <div className="card"style={{position:'relative', left:'150%'}}>
            <div>
              <div className="numbers">{userData.logoutTime || 0 }  </div>
              <div className="cardName">Out Time</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>
        <br />
      
        <div className="details">
          <div className="recentOrders" style={{display:'flex',flexDirection:'row'}}>
            <div className="leftOne">
            <h2 style={{fontSize:'23px',color:'rgba(113, 99, 186, 255)',position:'relative',top:'-20px'}}>Student Details</h2>
            <br />
            <div className="stu_img" style={{height:'200px',width:'200px',position:'relative',top:'-20px',boxShadow:'0 7px 25px rgba(0, 0, 0, 0.08)'}}>
              {/* student image */}
              <img src={qrcode} alt="" />
            </div>
            </div>

            <div className="rightOne" style={{position:'relative',left:'30%',fontSize:'18px'}}>
            <div className="topOne" style={{textAlign:'left' , width:'220%',position:'relative',left:'-30%'}} >
  <table >
    <tbody >
      <tr >
        <td>Name:</td>
        <td style={{textAlign:'center' }}>{userData.name}</td>
      </tr>
      <tr>
        <td>Department:</td>
        <td style={{textAlign:'center' }}>{userData.department}</td>
      </tr>
      <tr>
        <td>University No:</td>
        <td style={{textAlign:'center' }}>{userData.universityNo}</td>
      </tr>
      <tr>
        <td>Contact No:</td>
        <td style={{textAlign:'center' }}>{userData.contact}</td>
      </tr>
    </tbody>
  </table>
</div>

                <div className="bottumOne">
                    <Link to='/student/attendence'><button className="attendence_btn" style={{position:'relative', left:'8%',top:'30px'}}>Attendence</button></Link>
                    <Link to='/student/books'> <button className="books_btn"style={{position:'relative', left:'40%',top:'30px'}}>Books</button></Link>
                </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
