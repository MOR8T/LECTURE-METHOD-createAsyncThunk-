import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Page1 from './components/Page1/Page1';
import Page2 from './components/Page2/Page2';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Page1/>}/>
          <Route path='/page2' element={<Page2/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
