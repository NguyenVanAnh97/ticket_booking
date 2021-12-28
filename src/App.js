import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import { Suspense, lazy, Fragment } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

// const checkoutTemplate = lazy(() =>
//   import("./templates/CheckoutTemplate/CheckoutTemplate")
// );

export const history = createBrowserHistory();
const Example = ({ type, color }) => (
  <ReactLoading
    type={"bubbles"}
    color={"#87CEFA"}
    height={"50px"}
    width={"124px"}
  />
);

function App() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  return (
    <Router history={history}>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "99",
          }}
        >
          <Example />
        </div>
      ) : (
        ""
      )}

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/new" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <CheckoutTemplate path="/checkout/:id" exact component={Checkout} />

        {/* <Suspense fallback={<p>văn anh đẹp trai</p>}>
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
        <HomeTemplate path="/" exact Component={Home} />

        <UserTemplate path="/login" exact Component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
