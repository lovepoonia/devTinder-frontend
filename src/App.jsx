import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./component/Body"
import Login from "./component/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./component/Feed"
import Profile from "./component/Profile"
import Connection from "./component/Connection"
import Requests from "./component/Requests"
import Chat from "./component/Chat"

function App() {


  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter basename="/">
       <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/connection" element={<Connection/>}/>
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/chat/:targetUserId" element={<Chat/>}/>
        </Route>
       </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
