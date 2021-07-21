import React from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import Main from './components/main';
import { ProjectProvider } from './context/ProjectProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ProjectProvider>
        <Main />
      </ProjectProvider>
      <Footer />
    </div>
  );
}

export default App;
