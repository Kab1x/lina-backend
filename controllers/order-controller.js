export const createOrderCurrentCart = async (req, res) => {
  try {
    const { shippingAddress, itemsPrice, taxPrice, shippingPrice } = req.body;
    const { id } = req.user;

    const order = await OrderModel.create({
      userId: id,
      cart: req.user.currentCart,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating order" });
  }
};

export const createOrderForCart = async (req, res) => {
  const { shippingAddress, itemsPrice, taxPrice, shippingPrice } = req.body;
  const { id } = req.user;
  const { cartId } = req.params;

  const order = await OrderModel.create({
    userId: id,
    cart: cartId,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
  });

  res.status(201).json(order);
};
