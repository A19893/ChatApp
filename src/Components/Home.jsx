import React from "react";
import ParticularUser from "./ParticularUser";
import Navbar from './Navbar'
import SearchBar from "./SearchBar";
import Users from "./Users";
const Home = () => {
  // const email = useSelector((state) => state.userdetails.Username);
  return (
    <>
      <div className="chatContainer">
        <div className="appContainer">
           <Navbar/>
          <div className="userDisplay">
            <Users/>
          </div>
        </div>
       <ParticularUser/>
      </div>
    </>
  );
};

export default Home;
