const adminAuth = (req, res, next) => {
  const token = "xyzasdasd";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status("401").send("Unauthorized request");
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status("401").send("Unauthorized request");
  }
};

module.exports = { adminAuth, userAuth };
