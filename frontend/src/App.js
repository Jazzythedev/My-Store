import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
        <h1> Welcome to MyShop!</h1>
        </Container>
      <Footer />
      </main>
    </>
  );
}

export default App;
