import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => {
  return (
    <Box minHeight="100vh">
      <Header />
      <Flex width="100%">{props.children}</Flex>{" "}
    </Box>
  );
};
export default Layout;
