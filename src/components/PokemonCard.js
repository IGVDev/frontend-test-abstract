import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Box,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function PokemonCard({ pokemon, isCaught }) {
  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
      position="relative"
    >
      {isCaught && (
        <Box position="absolute" top="2" right="2">
          <FaStar style={{ color: "gold" }} size="24px" />
        </Box>
      )}

      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        />
      </AspectRatio>
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <HStack>
        {pokemon.types.map((type) => (
          <Badge size="xs" key={type.slot}>
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
