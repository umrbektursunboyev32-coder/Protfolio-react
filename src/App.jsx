import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Homepage from './Homepage'
import Ap from './ap'
import Skills from './Skills'
import TelegramContact from './Tgcontact'
import CountryList from './Flags'
import CurrencyConverter from './Pul'
import MovieSearch from './kino'

function App(){
  return(
    <BrowserRouter>
    
    <nav className='nav'>
      <Link to='/Homepage'>Asosiy</Link>
      <Link to='/Skills'>Dasturlash</Link>
      <Link to='/Con'>Bog`lanish</Link>
      <Link to='/hikmat'>Quote</Link>
      <Link to='/flags'>Flags</Link>
      <Link to='/pull'>Valyuta</Link>
      <Link to='/kino'>Kinolar</Link>
    </nav>

    <div style={{padding:'20px'}}>
      <Routes>
        <Route path='/Homepage' element={<Homepage />} />
        <Route path='/Skills' element={<Skills />} />
        <Route path='/Con' element={<TelegramContact />} />
        <Route path='/hikmat' element={<Ap />} />
        <Route path='/flags' element={<CountryList />} />
        <Route path='/pull' element={<CurrencyConverter />} />
        <Route path='/kino' element={<MovieSearch />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App