import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
// import { CartContext } from '../plugin/Context'



function StoredHeader() {

    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])

    console.log(isLoggedIn())

    const [search, setSearch] = useState()

    // const cartCount = useContext(CartContext)
    //console.log(cartCount)

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        console.log(search)
    }
    const navigate=useNavigate()

    const handleSearchSubmit = (event) => {
        navigate(`/search?query=${search}`)


    }


    const navbarStyle = {
        backgroundColor: 'black',
        border: '1px solid black'
        // Add more styles as needed
      };


      


  return (
    <div><nav className="navbar navbar-expand-lg " style={navbarStyle}>
    <div className="container">
        <Link className="navbar-brand" to="/">HR System </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                

            </ul>
            <div className="d-flex">
                <input name='search' onChange={handleSearchChange} className="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success me-2" type="button" onClick={handleSearchSubmit}>Search</button>
            </div>
            
            {isLoggedIn()
                ?
                <>
                    {/* <Link className="btn btn-primary me-2" to={'/customer/account/'}>Account</Link> */}
                    <Link className="btn btn-primary me-2" to="/logout">Logout</Link>
                </>
                :
                <>
                    <Link className="btn btn-primary me-2" to="/login">Login</Link>
                    {/* <Link className="btn btn-primary me-2" to="/register">Register</Link> */}

                </>
            }

        </div>
    </div>
</nav></div>
  )
}

export default StoredHeader