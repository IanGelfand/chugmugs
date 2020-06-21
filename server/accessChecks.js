const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Must have admin privileges')
    err.status = 401
    return next(err)
  }

  next()
}
const usersOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('Must be logged in')
    err.status = 401
    return next(err)
  }

  next()
}

module.exports = {
  adminsOnly,
  usersOnly
}
