import {React, ReactDOM } from "react";

const date = new Date().getFullYear();

function Footer(){
    return <footer>
    Adedayo Eyiladeogo &copy; {date}
  </footer>
}

export default Footer