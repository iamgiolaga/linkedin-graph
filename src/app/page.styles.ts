import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, styled } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const StyledLinkedInIcon = styled(LinkedInIcon)`
  width: 25vh;
  height: 25vh;
`;

export const StyledHeaderWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledGithubIconHover = `
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const StyledGithubIcon = styled(GitHubIcon)`
  width: 5vh;
  height: 5vh;
  position: fixed;
  right: 0;
  opacity: 0.5;
  margin-right: 1.5vh;
  color: white;
  ${StyledGithubIconHover}
`;
