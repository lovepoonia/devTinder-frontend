import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./component/Body"
import Login from "./component/Login"

function App() {


  return (
    <>
     <BrowserRouter basename="/">
       <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
        </Route>
       </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App
