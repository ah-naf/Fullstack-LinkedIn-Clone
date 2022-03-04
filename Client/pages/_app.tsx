import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import store from "../store/store";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const renderOrNot = (['/login', '/register', '/404'].includes(appProps.router.pathname))
  return (
    <Provider store={store}>
        {!renderOrNot && <Navbar />}
        <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
