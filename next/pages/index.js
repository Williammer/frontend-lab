import React, { Component } from 'react';
import Link from 'next/prefetch'
import Header from '../components/Header';
import Welcome from '../components/Welcome';
// import logo from '../res/logo.svg'

export default class extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-main">
          <Welcome />
          // {this.props.children}
        </div>

        <style jsx>{`
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }

          .App {
            text-align: center;
            font-family: serif;
          }

          .App-intro {
            font-size: large;
          }

          .App-main {
            margin-top: 40px;
          }
        `}</style>
      </div>
    );
  }
}