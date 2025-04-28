function passwordvalidation(password) {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return pattern.test(password);
}
module.exports = passwordvalidation;
