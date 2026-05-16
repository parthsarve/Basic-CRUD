// import './App.css'

import Userform from "./components/User-form"
import Userlist from "./components/User-list"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Userlist/>} />
      <Route path="/user-form" element={<Userform/>} />
      <Route path="/user-form/:id" element={<Userform/>} />
      </Routes>
      </BrowserRouter>
    {/* <Userform/>
    <Userlist/> */}
      </>
  )
}

export default App