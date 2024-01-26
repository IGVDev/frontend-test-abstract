import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Box,
} from "@chakra-ui/react";
import { TbPokeball } from "react-icons/tb";

const typeColors = {
  normal: "gray",
  fire: "red",
  water: "blue",
  electric: "yellow",
  grass: "green",
  ice: "cyan",
  fighting: "orange",
  poison: "purple",
  ground: "brown",
  flying: "gray",
  psychic: "pink",
  bug: "teal",
  rock: "gray",
  ghost: "black",
  dragon: "purple",
  dark: "black",
  steel: "gray",
  fairy: "pink",
};

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
          <TbPokeball style={{ color: "red" }} size="30px" />
        </Box>
      )}

      <Box h="125px" w="125px">
        <AspectRatio w="full" ratio={1}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={`Image of ${pokemon.name}`}
          />
        </AspectRatio>
      </Box>
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <HStack>
        {pokemon.types.map((type) => (
          <Badge
            size="xs"
            key={type.slot}
            colorScheme={typeColors[type.type.name]}
          >
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
