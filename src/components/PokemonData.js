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
  const [catched, setCatched] = useState(false);

  function handleCatch(catched) {
    if (catched) {
      axios
        .delete(`/api/catched/${pokemon.id}`)
        .then(() => {
          setCatched(false);
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
          setCatched(true);
          updateCaughtPokemon(pokemon, true);
        })
        .catch((err) => console.log(err));
    }
  }

  function checkCatched(id) {
    axios.get(`/api/catched/${id}`).then((res) => {
      if (res.status === 200 && res.data) {
        setCatched(true);
      }
    });
  }

  useEffect(() => {
    checkCatched(pokemon.id);
  }, []);

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox isChecked={catched} onChange={() => handleCatch(catched)}>
            Catched
          </Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Text>{pokemon.weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Text>{pokemon.height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text>{pokemon.moves.length}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
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
            <Text fontSize="xs">hp</Text>
            <Text fontSize="xs">{pokemon.stats[0].base_stat}</Text>
          </Flex>
          <Progress
            bg="gray.300"
            borderRadius="full"
            value={pokemon.stats[0].base_stat}
          />
        </Stack>
        <Stack>
          <Flex justifyContent={"space-between"}>
            <Text fontSize="xs">attack</Text>
            <Text fontSize="xs">{pokemon.stats[1].base_stat}</Text>
          </Flex>
          <Progress
            bg="gray.300"
            borderRadius="full"
            value={pokemon.stats[1].base_stat}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
