import { EXPECTED_COLUMNS } from "../common/constants";

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

  if (columns.some((item) => !EXPECTED_COLUMNS.includes(item))) {
    return false;
  }

  return true;
};
