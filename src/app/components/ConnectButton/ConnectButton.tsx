import { FC } from "react";
import type { ConnectButtonProps } from "./ConnectButton.types";
import * as S from "./ConnectButton.styles";

export const ConnectButton: FC<ConnectButtonProps> = () => {
  const handleClick = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.CLIENT_ID}&scope=r_dma_portability_self_serve&redirect_uri=${process.env.REDIRECT_URI}`;
  };

  return (
    <S.ButtonWrapper>
      <S.ConnectButton onClick={handleClick}>Connect</S.ConnectButton>
    </S.ButtonWrapper>
  );
};
