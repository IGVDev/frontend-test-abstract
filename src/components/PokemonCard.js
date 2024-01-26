import typeColors from "@/constants/typeColors";
import generateGradient from "@/utils/generateGradient";
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Box,
} from "@chakra-ui/react";
import { MdCatchingPokemon } from "react-icons/md";

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
        <Box position="absolute" top="5" right="5" zIndex={1}>
          <MdCatchingPokemon style={{ color: "red" }} size="30px" />
        </Box>
      )}

      {/* <Box h="125px" w="125px"> */}
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={`Image of ${pokemon.name}`}
          borderRadius={12}
          background={generateGradient(pokemon.types, typeColors)}
        />
      </AspectRatio>
      {/* </Box> */}
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <HStack>
        {pokemon.types.map((type) => (
          <Badge
            size="xs"
            key={type.slot}
            bgColor={typeColors[type.type.name].background}
          >
            <Text color={typeColors[type.type.name].text}>{type.type.name}</Text>
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
