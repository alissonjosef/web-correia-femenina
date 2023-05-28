import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatCurrency } from "../utils/formatCurrency";

interface CardsProps {
  description?: string;
  imageUrl?: string;
  name?: string;
  price: number;
}

export function CardsProduct({
  description,
  imageUrl,
  name,
  price,
}: CardsProps) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={imageUrl}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3" align="center">
          <Box h={10}>
            <Heading textAlign="center" size="md">
              {name}
            </Heading>
          </Box>
          <Box h={10}>
            {description?.length === 0 && (
              <Text textAlign="center" textOverflow="ellipsis">
                {description.length > 30
                  ? `${description.substring(0, 30)}...`
                  : description}
              </Text>
            )}
          </Box>
          <Text color="gray.700" fontWeight="bold" fontSize="2xl">
            {formatCurrency(price)}
          </Text>
        </Stack>
      </CardBody>

      {/* <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter> */}
    </Card>
  );
}
