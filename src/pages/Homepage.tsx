import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Flex justify="center" align="center" height="100vh">
      <div>
        <h1>Hello World</h1>
        <Link to="/">go to login</Link>
      </div>
    </Flex>
  );
};

export default Homepage;
