import { LoginCard } from "../components/LoginCard";
import pugImage from "../assets/pug.png";
import { Flex } from "@radix-ui/themes";
import styled from "styled-components";

const PugImage = styled.img`
  height: 75vh;
`;

const Login = () => {
  return (
    <>
      <Flex width="100vw" height="100vh" pt="15vh">
        <LoginCard />
      </Flex>
      <Flex position="absolute" bottom="0" right="0">
        <PugImage src={pugImage} alt="Cute pug" />
      </Flex>
    </>
  );
};

export default Login;
