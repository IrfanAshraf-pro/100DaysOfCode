class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const createErrroMessage = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = {
  createErrroMessage,
  CustomAPIError,
}
