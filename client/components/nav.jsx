import React from 'react';
function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className = "navbar-brand" href="#home">Wordlist</a>
      </div>
      <div className="nav-text">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#account">Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#games">Games</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#lists">Lists</a>
          </li>
        </ul>
      </div>

    </nav>
  );
}

export default Nav;
