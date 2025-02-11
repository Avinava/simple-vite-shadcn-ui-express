const handlePrismaError = (error) => {
  if (error.code === 'P2002') {
    const field = error.meta?.target?.[0] || 'field';
    return `A user with this ${field} already exists`;
  }
  
  if (error.code === 'P2025') {
    return 'Record not found';
  }

  if (error.code === 'P2003') {
    return 'Operation failed due to related records';
  }

  // Add more error codes as needed
  return error.message || 'An unexpected error occurred';
};

export { handlePrismaError };