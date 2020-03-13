const resBadRequest = (res, message) => {
  res.status(400);
  res.json({message})
}

module.exports = { resBadRequest }