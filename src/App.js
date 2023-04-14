import Header from "./components/layout/Header";
import AllTask from "./components/task/AllTask";
import CreateTask from "./components/task/CreateTask";
import EditTask from "./components/task/EditTask";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MessageState from "./components/common/message/context/MessageState";
import { Container } from "react-bootstrap";
import Message from "./components/common/message/Message";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";
function App() {
  const [progress , setProgress] = useState(0);
  return (
    <>
      <MessageState>
          <Router>
              <Header/>
              <LoadingBar
              color='#f11946'
              height={3}
              progress={progress}
            />
              <div>
              <Container>
                <Message/>
                <Routes>
                    <Route exact path="/" element={<AllTask setProgress={setProgress}/>}></Route>
                    <Route exact path="/create" element={<CreateTask/>}></Route>
                    <Route exact path="/edit/:id" element={<EditTask/>}></Route>
                  </Routes>
              </Container>
              </div>
            </Router>
      </MessageState>
    </>
  );
}
export default App;
