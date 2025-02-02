import { Flex, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { Link } from "react-router-dom";

import puppylove from "../assets/r-s.jpeg";

const Container = styled(Flex)`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const StyledLink = styled(Link)`
  color: var(--iris-11);
  text-decoration: none;
  font-size: 18px;
  margin-top: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledImage = styled.img`
  height: 50vh;
  object-fit: scale-down;
`;

const AboutUs = () => {
  return (
    <Container direction="column" gap="6">
      <StyledImage src={puppylove} alt="Sanford and Reinhardt" />

      <Text size="4" style={{ lineHeight: 1.6 }}>
        Hi I'm Sanford, and this is my best friend, Reinhardt.
      </Text>

      <Text size="4" style={{ lineHeight: 1.6 }}>
        We both love dogs.
      </Text>

      <Text size="4" style={{ lineHeight: 1.6 }}>
        I'm a software engineer and I'd really like to work for a company like
        Fetch that clearly values dogs as much as I do (and gives fun take home
        assignments).
      </Text>

      <Text size="4" style={{ lineHeight: 1.6 }}>
        Also please tell Kevin Bonanno and Moose that we say hey! And that they
        should come to the dog park soon.
      </Text>

      <Text size="4" style={{ lineHeight: 1.6 }}>
        Anyways, hope you enjoy the site! I really enjoyed making this. Please
        hire me!
      </Text>

      <StyledLink to="/homepage">← Back to Home</StyledLink>
    </Container>
  );
};

export default AboutUs;
