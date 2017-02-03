import React, { Component } from 'react';
import Link from 'next/prefetch'
import Logo from '../res/logo.svg'

class Header extends Component {
  render() {
    return (
        <div className="App-header">
          <Link href="/">
              <a>
                <Logo width='80px' />
              </a>
          </Link>
          <br/>
          <ul className="App-router">
            <li><Link href="/dataFetchList"><a>dataFetchList</a></Link></li>
            <li><Link href="/stopWatch"><a>stopWatch</a></Link></li>
            <li><Link href="/nameForm"><a>nameForm</a></Link></li>
          </ul>
        <style jsx>
        {`
          .App-logo {
            animation: App-logo-spin infinite 20s linear;
            height: 80px;
          }

          .App-header {
            background-color: #222;
            height: 150px;
            padding: 20px;
            color: white;
          }

          .App-router {
            background: white;
            text-decoration: none;
            text-align: left;
            padding: 10px 20px;
          }

          .App-router li {
            display: inline-block;
            margin-right: 10px;
          }

          .App-router li a {
            text-decoration: none;
            color: #333;
          }

          .App-router li a.active {
            font-weight: bold;
            border-bottom: 1px solid #333;
          }
        `}
        </style>
      </div>
    );
  }
}

export default Header;
