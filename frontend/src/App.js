import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header.js";
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';

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
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/cart/:id' element= { <CartScreen /> } />                 {/* route to add an item to cartscreen. This route includes the items ID*/}
                <Route path='/cart' element= { <CartScreen /> } />                    {/*  This route shows all the items in the cart*/}
                <Route path='/login' element= { <LoginScreen /> } />     {/* dont say 'exact' like homescreen route since there will be ? ...... queries to add to the route */}
              </Routes>
            </Container>                                                          
            </main>
            <Footer />
        </Router>
    </>
  );
}

export default App;
