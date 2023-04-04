import jwt from "jsonwebtoken";

const createToken7d = async (ID) => {
  const token = await jwt.sign({ _id: ID }, process.env.JWT_Secret, {
    expiresIn: "7d",
  });
  return token;
};

export { createToken7d };
