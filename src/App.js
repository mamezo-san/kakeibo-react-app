import React from 'react'
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return(
    <React.Fragment>
      <div>
        <Header 
          title={"家計簿アプリ"}
          subtitle={"家計簿アプリとは"}
          />
        <Main />
        <Footer
          line={'LINEで送信する'}
          cvs={'cvsで保存する'}
        />
      </div>
    </React.Fragment>
  )
}


export default App;
