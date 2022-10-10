import { Flex, Text, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex
      width="100%"
      height="60px"
      className="header"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" fontWeight="700" color="white">
        Wall Decor Previewer
      </Heading>
    </Flex>
  );
};
export default Header;
