import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import Signup from './pages/Signup'
import Like from './pages/Like'
import Explore from './pages/Explore'
import Sidebar from './components/Sidebar'


function App() {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/login' element={<Loginpage />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/explore' element={<Explore />} />
					<Route path='/likes' element={<Like />} />
				</Routes>
			</div>
		</div>
	);
}
export default App
