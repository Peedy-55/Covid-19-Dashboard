import {Link, withRouter} from 'react-router-dom'

const Header = () => (
  <nav className="nav-header">
    <div className="hor-card">
      <Link to="/">
        <h1>COVID19INDIA</h1>
      </Link>

      <div className="nav-bar-large-container">
        <ul className="hor-card">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default withRouter(Header)
