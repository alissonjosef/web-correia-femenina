import { Flex, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Flex w="100%" h='100vh' justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
}
