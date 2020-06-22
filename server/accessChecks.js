const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Must have admin privileges')
    err.status = 401
    return next(err)
  }

  next()
}

module.exports = {
  adminsOnly
}
