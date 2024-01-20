import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705723296/Group_7484_fyqehz.png"
      alt="not-found-pic"
      className="not-found-img"
    />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Home</button>
    </Link>
  </div>
)

export default NotFound
