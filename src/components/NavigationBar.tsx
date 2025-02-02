import { Button, Flex } from "@radix-ui/themes";
import { styled } from "styled-components";
import Logo from "../assets/Logo";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;

  @media (max-width: 768px) {
    padding: 4px 1rem;
  }
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: medium;
  font-family: "Atma", sans-serif;
`;

const GenericButton = styled(Button)`
  font-family: "Atma", sans-serif;
  font-size: 1.5rem;
  color: black !important;
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
`;

const ButtonContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  return (
    <NavContainer>
      <Flex direction="row">
        <GenericButton
          variant="ghost"
          color="gray"
          onClick={() => {
            if (isAuthenticated) {
              navigate("/homepage");
            } else {
              navigate("/");
            }
          }}
        >
          <LogoText>Sanford's Strays</LogoText>
          <Logo height="32px" />
        </GenericButton>
      </Flex>
      {isAuthenticated && (
        <ButtonContainer gap="4">
          <GenericButton
            variant="ghost"
            color="gray"
            onClick={() => navigate("/about")}
          >
            About Us
          </GenericButton>
          <GenericButton
            variant="ghost"
            color="gray"
            onClick={() => navigate("/match")}
          >
            Match
          </GenericButton>
          <GenericButton variant="ghost" color="gray" onClick={logout}>
            Sign Out
          </GenericButton>
        </ButtonContainer>
      )}
    </NavContainer>
  );
};

export default NavigationBar;
