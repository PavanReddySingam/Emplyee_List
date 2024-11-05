
import EmployeeList from './Pages/EmployeeList';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UpdateEmp from './Pages/UpdateEmp';
import "./App.css"

function App() {
  return (
   <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeList/>}/>
          <Route path='/updateEmp/:id' element={<UpdateEmp/>}/>
          
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
