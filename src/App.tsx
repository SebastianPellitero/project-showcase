import React from 'react';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import Dashboard from './components/main/Dashboard';
import { ProjectProvider } from './context/ProjectProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ProjectProvider>
        <Dashboard />
      </ProjectProvider>
      <Footer />
    </div>
  );
}

export default App;
