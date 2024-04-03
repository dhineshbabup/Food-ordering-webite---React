import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import CartItem from "./CartItem";
export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartContext.addItem(item)}
            onDecrease={() => cartContext.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
