import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
        <Router>             {/*    Wrap the whole thing to make everything routable */}
          <Header />
            <main className='py-4'>
            <Container>
               <Route path='/' element={<HomeScreen />} exact />                  {/*   when the path is / exactly at end of url then show homescreem component   */}
                <Route path='/product/:id' element={ <ProductScreen /> } />        {/* use colon to read off parameter in js file */}
            
            </Container>                                                          
            </main>
            <Footer />
        </Router>
    </>
  );
}

export default App;
