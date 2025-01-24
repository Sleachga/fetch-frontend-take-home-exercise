import { LoginCard } from "../components/LoginCard";
import pugImage from "../assets/pug.png";
import { Flex } from "@radix-ui/themes";
import styled from "styled-components";
import PawIcon from "../assets/PawIcon";

const PugImage = styled.img`
  @media (orientation: landscape) {
    height: 75vh;
    width: auto;
  }

  @media (orientation: portrait) {
    width: 75vw;
    height: auto;
  }
`;

interface StyledPawProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotation?: string;
  color: string;
  isMobile?: boolean;
}

const StyledPawIcon = styled(PawIcon)<StyledPawProps & { isMobile?: boolean }>`
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  color: ${(props) => props.color};
  transform: ${(props) => `rotate(${props.rotation})`};

  ${(props) =>
    props.isMobile &&
    `
    @media (max-width: 768px) {
      display: none;
    }
  `}
`;

const Login = () => {
  return (
    <Flex width="100vw" height="100vh">
      <StyledPawIcon
        width="250px"
        height="250px"
        top="10vh"
        right="10vw"
        color="#e2d6ef"
        rotation="30deg"
      />
      <StyledPawIcon
        width="200px"
        height="200px"
        bottom="10vh"
        left="30vw"
        color="#b5e0cc"
        rotation="-30deg"
      />
      <StyledPawIcon
        width="225px"
        height="225px"
        top="20vh"
        left="10vw"
        color="#fee6de"
        rotation="-30deg"
        isMobile
      />
      <Flex position="absolute" bottom="0" right="0">
        <PugImage src={pugImage} alt="Cute pug" />
      </Flex>
      <Flex width="100vw" height="100vh" pt="20vh">
        <LoginCard />
      </Flex>
    </Flex>
  );
};

export default Login;
