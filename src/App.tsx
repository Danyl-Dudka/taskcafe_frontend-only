import './App.css'
import Content from './components/Content';
import AuthProvider from './providers/AuthProvider';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path='/*' element={<Content />} />
          </Routes>
        </HashRouter>
      </AuthProvider>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
