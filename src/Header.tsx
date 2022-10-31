import { Flex, Text, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex
      width="100%"
      height="70px"
      className="header"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" fontWeight="100" color="#232323">
        Wall Decor Previewer
      </Heading>
    </Flex>
  );
};
export default Header;
