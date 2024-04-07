export const validateContent = (content: unknown[]): boolean => {
  if (!Array.isArray(content)) {
    return false;
  }
  if (content.length === 0) {
    return false;
  }
  if (content.length < 4) {
    return false;
  }

  const columns = content[3];

  if (!Array.isArray(columns)) {
    return false;
  }

  const expectedColumns = [
    "First Name",
    "Last Name",
    "URL",
    "Email Address",
    "Company",
    "Position",
    "Connected On",
  ];

  if (columns.some((item) => !expectedColumns.includes(item))) {
    return false;
  }

  return true;
};
