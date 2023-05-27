import { Grid } from "@chakra-ui/react";

export function ContainerMain({children}:any) {
  return (
    <Grid
      gap={2}
      templateColumns="repeat(4, 1fr)"
      w="100%"
      maxWidth={1480}
      h={20}
      mt="10"
      mx="auto"
      px={20}
    >
      {children}
    </Grid>
  );
}
