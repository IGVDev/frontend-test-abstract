import typeColors from "@/constants/typeColors";
import generateGradient from "@/utils/generateGradient";
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Checkbox,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonData({ pokemon, updateCaughtPokemon }) {
  const [caught, setCaught] = useState(false);
  const toast = useToast();

  function handleCatch(caught) {
    if (caught) {
      axios
        .delete(`/api/catched/${pokemon.id}`)
        .then(() => {
          setCaught(false);
          updateCaughtPokemon(pokemon, false);
        })
        .catch((err) =>
          toast({
            title: "Error",
            description: "Sorry, something went wrong on our end.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );
    } else {
      axios
        .post(`/api/catched`, {
          id: pokemon.id,
          name: pokemon.name,
        })
        .then(() => {
          setCaught(true);
          updateCaughtPokemon(pokemon, true);
          toast({
            title: "Congratulations!",
            description: "You caught a Pokemon!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        })
        .catch((err) =>
          toast({
            title: "Error",
            description: "Sorry, something went wrong on our end.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );
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
            padding={2}
          >
            Caught
          </Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            borderRadius={12}
            alt={`Picture of ${pokemon.name}`}
            background={generateGradient(pokemon.types, typeColors)}
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
                  background={typeColors[type.type.name].background}
                >
                  <Text color={typeColors[type.type.name].text}>
                    {type.type.name}
                  </Text>
                </Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        spacing="5"
        p="5"
        bg={useColorModeValue("gray.100", "gray.800")}
        borderRadius="xl"
      >
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
            bg={useColorModeValue("gray.300", "gray.600")}
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
            bg={useColorModeValue("gray.300", "gray.600")}
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
