import './App.css';
import { useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import { useDispatch } from 'react-redux';
import { fetchCart } from './redux/actions/cartActions';
import { setUserDeatils as setUserDetails } from './redux/actions/userAction';

function App() {

  const dispatch = useDispatch(); 

  useEffect(() => {
    // Fetch cart and user details when the app loads
    dispatch(fetchCart());
    dispatch(setUserDetails());
  }, [dispatch]);

  return (
    <Router>
     <div className="screen"> 
      <Navbar /> {/* Show the side drawer when the Navbar is clicked */}

      <main className="app">
        <Switch>
          {/* Define routes for different screens */}
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </main>
      <Footer />
     </div> 
    </Router>
  );
}

export default App;
