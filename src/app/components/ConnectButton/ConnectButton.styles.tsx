import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { FC, HTMLAttributes } from "react";

export const ButtonWrapper = styled("div")`
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  color: white;
  border-color: grey;
  width: 14rem;
  height: 3rem;

  &:hover {
    border-color: white;
    font-weight: bold;
  }
`;

export const ConnectButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  children,
}) => (
  <StyledButton variant="outlined" onClick={onClick}>
    {children}
  </StyledButton>
);
