import { OrderSuccess } from "./components/OrderSuccess";
import { useTitle } from "../../hooks/useTitle";
import { OrderFail } from "./components/OrderFail";
import { useLocation } from "react-router-dom";

export const OrderPage = () => {
  useTitle("Order Summary");

  const { state } = useLocation();

  

  if (!state) {
    return <OrderFail />; 
  }

  return (
    <main>
     { state.status ? <OrderSuccess data={state.data} /> : <OrderFail /> }
    </main>
  )
}