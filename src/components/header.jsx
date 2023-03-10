import { Link } from "react-router-dom";


const Header = () => {
    return (
        <nav className="navbar navbar-expand-md bg-warning">
            <div className="container"> 
            <Link class="navbar-brand" to="/">Matsawana Butchery</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> 
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Inventory</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Meat</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Financial</Link>
        </li>
      </ul>
    </div>

            </div>
        </nav>
    )
}

export default Header;