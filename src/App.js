import { AllRoutes } from './routes/AllRoutes';
import './App.css';
import { Header, Footer } from './components';

export default function App() {
  return (
    <div className="App dark:bg-dark">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}
