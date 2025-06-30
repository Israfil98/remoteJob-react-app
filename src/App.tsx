import { Toaster } from 'react-hot-toast';
import Background from './components/Background';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Background />
      <Header />
      <Container />
      <Footer />
      <Toaster position='top-right' />
    </>
  );
}

export default App;
