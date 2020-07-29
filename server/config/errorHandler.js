const responseStatus = require("./responseStatuses");

function errorHandler(error) {
  switch (error) {
    case responseStatus.badRequest:
		throw new Error("Required fields cannot be blank.")
    case responseStatus.badCredentials:
		throw new Error("Incorrect credentials.")
    case responseStatus.forbiddenAccess:
		throw new Error("You are not authorized to view this content.")
    case responseStatus.userNotFound:
    throw new Error("This user does not exist.")
    case responseStatus.noteNotFound:
    throw new Error("This note does not exist.")
    case responseStatus.conflict:
		throw new Error("User already exists.")
    case responseStatus.serverError:
		throw new Error("The request could not be completed. Please try again later.")
    default:
    throw new Error(error.message);
  }
}

module.exports = errorHandler;
