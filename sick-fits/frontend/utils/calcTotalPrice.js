export default (cart) => cart.reduce(
  (tally, cartItem) => !cartItem.item ? tally : tally + cartItem.quantity * cartItem.item.price,
  0
);
