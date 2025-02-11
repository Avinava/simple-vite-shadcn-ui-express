const createResponse = (success, data = null, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString()
});

const successResponse = (data, message = 'Success') => 
  createResponse(true, data, message);

const errorResponse = (message = 'Error', data = null) => 
  createResponse(false, data, message);

module.exports = {
  successResponse,
  errorResponse
};