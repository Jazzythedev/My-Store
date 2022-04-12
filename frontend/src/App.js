import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const App = () => {
  return (
    <>
        <Router>             {/*    Wrap the whole thing to make everything routable */}
          <Header />
            <main className='py-4'>
            <Container>
              <Routes>                                                           {/*    Must wrap all individual routes in Routes */}
                <Route path='/' element={ <HomeScreen /> } exact />                  {/*   when the path is / exactly at end of url then show homescreem component   */}
                <Route path='/product/:id' element={ <ProductScreen /> } />        {/* use colon to read off parameter in js file */}
                <Route path='/cart/:id' element= { <CartScreen/> } />                 {/* route to add an item to cartscreen. This route includes the items ID*/}
                <Route path='/cart' element= { <CartScreen/> } />                    {/*  This route shows all the items in the cart*/}
              </Routes>
            </Container>                                                          
            </main>
            <Footer />
        </Router>
    </>
  );
}

export default App;
