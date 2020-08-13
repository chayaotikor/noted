const responseStatus = require("./responseStatuses");

function errorHandler(error) {
  switch (error) {
    case responseStatus.badRequest:
		throw Error("Required fields cannot be blank.")
    case responseStatus.badCredentials:
		throw Error("Incorrect credentials.")
    case responseStatus.forbiddenAccess:
		throw Error("You are not authorized.")
    case responseStatus.userNotFound:
    throw Error("This user does not exist.")
    case responseStatus.noteNotFound:
    throw Error("This note does not exist.")
    case responseStatus.conflict:
		throw Error("User already exists.")
    case responseStatus.serverError:
		throw Error("The request could not be completed. Please try again later.")
    default:
    throw Error(error.message);
  }
}

module.exports = errorHandler;
