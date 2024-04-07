import { CircularProgress, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import type { DropAreaProps } from "./FileUploader.styles.types";

const DropAreaHover = `
    &:hover {
        opacity: 0.6;
    }
`;

export const DropAreaText = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const DropArea = styled(Box)`
  border: 2px solid #ccc;
  width: 50vh;
  height: 10vh;
  border-radius: 10px;
  cursor: pointer;
  opacity: ${({ isDragging }: DropAreaProps) => (isDragging ? 0.6 : 1)};
  ${DropAreaHover}
`;

export const DropAreaContentWrapper = styled(Box)`
  height: 100%;
`;

export const LoaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled(CircularProgress)`
  color: #fff;
`;
