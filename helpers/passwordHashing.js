import bcrypt from "bcrypt";

const hashPassword = async (Password) => {
  const num = process.env.bcryptS;
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(Password, salt);
};

const matchPassword = async (SimplePassword, HashedPassword) => {
  return await bcrypt.compare(SimplePassword, HashedPassword);
};

export { hashPassword, matchPassword };
