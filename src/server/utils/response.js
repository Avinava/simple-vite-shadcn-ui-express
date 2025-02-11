const createResponse = (success, data = null, message = "") => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
});

export const successResponse = (data, message = "Success") =>
  createResponse(true, data, message);

export const errorResponse = (message = "Error", data = null) =>
  createResponse(false, data, message);
