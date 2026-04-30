import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homepage from './Homepage'
import Ap from './ap'
import Skills from './Skills'
import TelegramContact from './Tgcontact'
import CountryList from './Flags'

function App(){
  return(
    <BrowserRouter>
    
    <nav className='nav'>
      <Link to='/Homepage'>Asosiy</Link>
      <Link to='/Skills'>Dasturlash</Link>
      <Link to='/Con'>Bog`lanish</Link>
      <Link to='/hikmat'>Quote</Link>
      <Link to='/flags'>Flags</Link>
    </nav>

    <div style={{padding:'20px'}}>
      <Routes>
        <Route path='/Homepage' element={<Homepage />} />
        <Route path='/Skills' element={<Skills />} />
        <Route path='/Con' element={<TelegramContact />} />
        <Route path='/hikmat' element={<Ap />} />
        <Route path='/flags' element={<CountryList />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App