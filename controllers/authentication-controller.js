import { UserModel } from "../models/user-model.js";

export const login = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong password" });
    }
  } else {
    res.json({ success: false, errors: "wrong Email ID" });
  }
};

export const signup = async (req, res) => {
  let check = await UserModel.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing users found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[0] = 0;
  }
  const user = new UserModel(req.body);

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
};
