import {
  Box,
  AspectRatio,
  Image,
  Stack,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  Badge,
  HStack,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

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

export default function PokemonData({ pokemon, updateCaughtPokemon }) {
  const [caught, setCaught] = useState(false);

  function handleCatch(caught) {
    if (caught) {
      axios
        .delete(`/api/catched/${pokemon.id}`)
        .then(() => {
          setCaught(false);
          updateCaughtPokemon(pokemon, false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`/api/catched`, {
          id: pokemon.id,
          name: pokemon.name,
        })
        .then(() => {
          setCaught(true);
          updateCaughtPokemon(pokemon, true);
        })
        .catch((err) => console.log(err));
    }
  }

  function checkCaught(id) {
    axios.get(`/api/catched/${id}`).then((res) => {
      if (res.status === 200 && res.data) {
        setCaught(true);
      }
    });
  }

  useEffect(() => {
    checkCaught(pokemon.id);
  }, []);

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox
            isChecked={caught}
            onChange={() => handleCatch(caught)}
            userSelect={"none"}
          >
            Caught
          </Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={`Picture of ${pokemon.name}`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm" fontWeight="bold">
              Weight
            </Text>
            <Text>{pokemon.weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight="bold">
              Height
            </Text>
            <Text>{pokemon.height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm" fontWeight="bold">
              Types
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
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Flex justifyContent={"space-between"}>
            <Text fontSize="xs" fontWeight="bold">
              HP
            </Text>
            <Text fontSize="xs" fontWeight="bold">
              {pokemon.stats[0].base_stat}
            </Text>
          </Flex>
          <Progress
            bg="gray.300"
            borderRadius="full"
            value={pokemon.stats[0].base_stat}
          />
        </Stack>
        <Stack>
          <Flex justifyContent={"space-between"}>
            <Text fontSize="xs" fontWeight="bold">
              ATTACK
            </Text>
            <Text fontSize="xs" fontWeight="bold">
              {pokemon.stats[1].base_stat}
            </Text>
          </Flex>
          <Progress
            bg="gray.300"
            borderRadius="full"
            value={pokemon.stats[1].base_stat}
          />
        </Stack>
      </Stack>
      <Stack>
        <Text fontSize="md" fontWeight="bold">
          Moves
        </Text>
        <ul>
          {pokemon.moves
            .filter((item, index) => index < 5)
            .map((move) => {
              const formattedMoveName = move.move.name
                .split("-")
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" ");
              return (
                <Text key={move.move.name} fontSize="sm">
                  <li>{formattedMoveName}</li>
                </Text>
              );
            })}
        </ul>
        {pokemon.moves.length - 5 > 0 && (
          <Text fontSize="xs">and {pokemon.moves.length - 5} more...</Text>
        )}
      </Stack>
    </Stack>
  );
}
