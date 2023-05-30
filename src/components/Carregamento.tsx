import { Flex, Spinner } from "@chakra-ui/react";

export function Carregamento() {
  return (
    <Flex w="100%" h='100vh' justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
}
