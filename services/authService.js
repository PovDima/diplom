const moment = require("moment");
const crypto = require("crypto");

const { validateLoginInput, validateRegisterInput, validateEmail, validatePassword } = require("../validation/users");
const Token = require("../models/Token");
const User = require("../models/User");
const transport = require('../utils/nodemailer')
const config = require('../utils/config')

const { USER_EMAIL, HOST } = config

const login = async (req, res) => {
  try {
    const { body } = req
    const { error } = validateLoginInput(body);

    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: body.email })
    if (!user) return res.status(404).send({ message: "No user found with this email address." });
    if (!user.isVerified) return res.status(400).send({ message: "This account is not verified. Please log in." });
    const token = await user.getJWT()
    return res.status(200).send({ message: "Login success", token, user });
  } catch (err) {
    return res.status(401).send({ message: "Authentication failed", err })
  }
}

const forgot = async (req, res) => {
  const { body } = req
  const { error } = validateEmail(body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const user = await User.findOne({ email: body.email })
    if (!user) return res.status(404).send({ message: "No user found with this email address." });

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    user.passwordResetToken = token.token;
    user.passwordResetExpires = moment().add(12, "hours");

    await user.save();
    await token.save();
    await transport.forgot({ user, token })

    return res.status(200).send({ message: `A validation email has been sent to ${user.email}` });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Сталася несподівана помилка", err });
  }
}

const reset = async (req, res) => {
  const { body, params } = req
  const { error } = validatePassword(body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const token = await Token.findOne({ token: params.token })
    if (!token) return res.status(404).send({ message: "This token is not valid. Your token may have expired." });

    const user = await User.findById(token.userId);
    if (!user) return res.status(404).send({ message: `We were unable to find a user for this token.` });
    if (user.passwordResetToken !== token.token) return res.status(400).send({ message: "User token and your token didn't match. You may have a more recent token in your mail list." });
    if (moment().utcOffset(0) > user.passwordResetExpires) return res.status(400).send({ message: "You cannot reset your password. The reset token has expired. Please go through the reset form again.", })

    user.password = body.password;
    user.passwordResetToken = "";
    user.passwordResetExpires = '';

    await user.hashPassword();
    await user.save();
    await transport.reset({ user });

    return res.status(200).send({ message: "Password has been successfully changed." });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const register = async (req, res) => {
  const { body } = req
  const { error } = validateRegisterInput(body);
  let user
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    user = await User.findOne({ email: body.email.toLowerCase() });
    if (user) return res.status(400).send({ message: "Email already registered. Take an another email" });


    user = new User(body);

    await user.hashPassword();
    await user.save()

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    await token.save()
    await transport.register({ user, token })

    return res.status(200).send({ message: "A verification mail has been sent." });
  } catch (err) {
    User.findOneAndDelete({ email: user.email, isVerified: false }, (err) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Impossible to delete the created user. Contact support or wait 12 hours to retry."
          );
      }
    });

    return res.status(503).send({ message: `Impossible to send an email to ${body.email}, try again. Our service may be down.`, err });
  }
}

const resend = async (req, res) => {
  const { body } = req
  const { error } = validateEmail(body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const user = await User.findOne({ email: body.email })
    if (!user) return res.status(404).send({ message: "We were unable to find a user with that email." });
    if (user.isVerified) return res.status(400).send({ message: "This account has already been verified. Please log in." });

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    await token.save()
    await transport.register({ user, token })

    return res.status(200).send({ message: "A verification mail has been sent." });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err })
  }
}

const registerReset = async (req, res) => {
  const { body } = req
  const { error } = validateEmail(body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const user = await User.findOneAndDelete({ email: body.email, isVerified: false })
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send({ message: "User reset success" });
  } catch (err) {
    return res.status(500).send("Сталася несподівана помилка")
  }
}

const confirmation = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token })
    if (!token) return res.status(404).send({ message: "We were unable to find a valid token. Your token may have expired." });

    const user = await User.findById(token.userId)
    if (!user) return res.status(404).send({ message: `We were unable to find a user for this token.` });
    if (user.isVerified) return res.status(400).send({ message: "This user has already been verified. Please log in." });

    user.isVerified = true;
    user.expires = null;
    await user.save()
    return res.status(200).send({ message: "The account has been verified. Please log in." });
  } catch (err) {
    return res.status(500).send({ message: "Сталася несподівана помилка", err });
  }
}

module.exports = { login, forgot, reset, register, resend, confirmation, registerReset }
