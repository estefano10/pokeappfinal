import {
  useState,
  useEffect,
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import {
  Card,
  Container,
  Grid,
  Image,
  Text,
  Popover,
  Button,
  Spacer,
  Pagination as UIPagination,
  Row,
} from "@nextui-org/react";

import { pokeApi } from "../../apis";
import Layout from "../../components/layout/Layout";
import { getPokemonAbility, getPokemonInfo } from "../../utils";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Mousewheel, Scrollbar } from 'swiper';

import localFavorites from "../../utils/localFavorites";
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';



const PokemonByNamePage = ({ pokemon }) => {
  const [abilitiesData, setAbilitiesData] = useState([]);
  const [movesInfo, setMovesInfo] = useState([]);
  const [moves, setMoves] = useState(pokemon.moves.slice(0, 4));
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
  const [imagenes, setImagenes] = useState([]);

  const onToggleFavorites = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites)
  }

  const getAbility = async () => {
    let arrayAux = [];
    for (let i = 0; i < pokemon.abilities.length; i++) {
      const res = await getPokemonAbility(pokemon.abilities[i].ability.name);
      arrayAux.push(res);
    }
    setAbilitiesData(arrayAux);
  };
  const getMoves = async () => {
    let arrayAux = [];
    for (let i = 0; i < pokemon.moves.length; i++) {
      const res = await pokeApi.get(`/move/${pokemon.moves[i].move.name}`);
      arrayAux.push(res.data);
    }
    setMovesInfo(arrayAux);
  };

  useEffect(() => {
    setImagenes([
      pokemon?.sprites?.other?.dream_world?.front_default,
      pokemon.sprites.other?.home.front_default,
      pokemon.sprites.other?.home.front_shiny,
      pokemon.sprites.other?.["official-artwork"].front_default,
    ]);
    getAbility();
    getMoves();
  }, []);

  const handlePage = (page) => {
    let inicio = page * 4 - 4;
    let final = page * 4;
    setMoves(pokemon.moves.slice(inicio, final));
  };
  return (
    <Layout
      title={"Pokedex | " + pokemon.name.replace(/^\w/, (c) => c.toUpperCase())}
    >
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header>
              <Row
                justify="space-between"
                align="center"
                css={{
                  "@smMax": {
                    flexDirection: "column",
                    justifyItems: "flex-start",
                    alignItems: "flex-start",
                  },
                  "@smMin": {
                    flexDirection: "row",
                    justifyItems: "space-between",
                    alignItems: "center",
                  },
                }}
              >
                <Text h1 transform="capitalize">
                  {pokemon.name}
                </Text>

                <Button 
                  color="gradient"
                  ghost = {!isInFavorites}
                  onClick = {onToggleFavorites}>
                 
                 {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}

                 
                </Button>
              </Row>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
              <Spacer
                y={1}
                css={{
                  height: "2px",
                  width: "100%",
                  margin: "10px auto !important",
                  backgroundColor: "$blue500",
                }}
              />

              <Text size={30}>Stats:</Text>
              
              <Grid.Container direction="row" justify="flex-start" gap={2}>
                {pokemon.stats.map((stat) => (
                  <Grid xs={4} key={stat.stat.name} justify="space-between">
                    <Text h4 transform={"capitalize"}>
                      {stat.stat.name}:
                    </Text>
                    <Text h4 b>
                      {stat.base_stat}
                    </Text>
                  </Grid>
                ))}
                <Grid xs={4} justify="space-between">
                  <Text h4 transform={"capitalize"}>
                    Peso:
                  </Text>
                  <Text h4 b>
                    {pokemon.weight}
                  </Text>
                </Grid>
                <Grid xs={4} justify="space-between">
                  <Text h4 transform={"capitalize"}>
                    Experiencia:
                  </Text>
                  <Text h4 b>
                    {pokemon.base_experience}
                  </Text>
                </Grid>
                <Grid xs={4} justify="space-between"></Grid>
              </Grid.Container>
              <Spacer
                y={1}
                css={{
                  height: "2px",
                  width: "100%",
                  margin: "10px auto !important",
                  backgroundColor: "$blue500",
                }}
              />
              
              <Text size={30}>Habilidades:</Text>
              <Grid.Container direction="row" justify="flex-start" gap={2}>
                {abilitiesData.map((ability) => (
                  <Grid key={ability.name} justify="space-between">
                    <Popover>
                      <Popover.Trigger>
                        <Button auto flat css={{ textTransform: "capitalize" }}>
                          {ability.name}
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content css={{ backgroundColor: "$gray200" }}>
                        <Text css={{ p: "$10", color: "$gray800" }}>
                          {ability.text.flavor_text}
                        </Text>
                      </Popover.Content>
                    </Popover>
                  </Grid>
                ))}
              </Grid.Container>
              <Spacer
                y={1}
                css={{
                  height: "2px",
                  width: "100%",
                  margin: "10px auto !important",
                  backgroundColor: "$blue500",
                }}
              />
              
              <Text size={30}>Movimientos:</Text>
              <Grid.Container direction="row" justify={"center"} gap={2}>
                {moves.map((move) => (
                  <Grid key={move.move.name} justify={"center"}>
                    <Popover>
                      <Popover.Trigger>
                        <Button auto flat css={{ textTransform: "capitalize" }}>
                          {move.move.name}
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content css={{ backgroundColor: "$gray200" }}>
                        {movesInfo.length > 0 &&
                          movesInfo
                            .filter(
                              (moveInfo) => moveInfo.name === move.move.name
                            )
                            .map((moveInfo) => (
                              <div
                                key={moveInfo.name}
                                style={{ padding: "20px" }}
                              >
                                <Text h4>
                                  {
                                    moveInfo.names.filter(
                                      (name) => name.language.name === "es"
                                    )[0].name
                                  }
                                </Text>
                                {moveInfo.power && (
                                  <Text>Power: {moveInfo.power}</Text>
                                )}

                                {moveInfo.accuracy && (
                                  <Text>Precisión: {moveInfo.accuracy}</Text>
                                )}
                                {moveInfo.pp && <Text>PP: {moveInfo.pp}</Text>}
                              </div>
                            ))}
                      </Popover.Content>
                    </Popover>
                  </Grid>
                ))}
                <Grid css={{ marginTop: "20px" }} xs={12} justify={"center"}>
                  <UIPagination
                    color={"gradient"}
                    shadow
                    className="pagination-custom"
                    noMargin
                    animated
                    onChange={(page) => handlePage(page)}
                    total={(parseInt((pokemon.moves.length / 4).toFixed()), 10)}
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        
                   
        
        
        </Grid>
      
      </Grid.Container>
      
      <Card>
              <Card.Header>
                <Text><h2>Galeria</h2></Text>
              </Card.Header>

              <Card.Body>
                <Swiper
                  cssMode = {false}
                  navigation = {true}
                  pagigation = {true}
                  mousewheel = {true}
                  keyboard = {true}
                  modules = {[Navigation, Pagination, Mousewheel, Scrollbar]}
                  className = 'mySwiper' >

                    {imagenes.map(
                      (imagen, index) => (
                        <SwiperSlide key={index} style = {{width:'100%'}}>
                          <Card css={{maxWidth: '300px', marginBotton: '20px', alignItems:'center'}} >
                            <Card.Body>
                              <Card.Image
                              src = {imagen}
                              alt = {pokemon.name}
                              width = '100%'
                              height={200}>
                                
                              </Card.Image>
                            </Card.Body>
                          </Card>
                        </SwiperSlide>
                      )
                    )}
                </Swiper>
              </Card.Body>
      </Card>                 
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get("/pokemon?limit=151");
  const pokemonNames = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const { name } = params;

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonByNamePage;
