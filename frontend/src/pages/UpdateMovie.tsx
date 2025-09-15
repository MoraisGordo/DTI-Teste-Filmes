import { Box, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { putMovie, getMovie } from "../services/MoviesServices";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";



export default function NewMovie() {

    const [movie, setMovie] = useState<Movie>();
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [releaseDate, setReleaseDate] = useState<string>("");
    const id = Number(useSearchParams()[0].get("id") as string);
    const navegar = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const movie = await getMovie(id);
                setMovie(movie);
                setName(movie.name);
                setPrice(movie.price);
                setReleaseDate(movie.release_date);
            } catch (error) {
                console.log("Erro ao buscar filme:", error);
            }
        }
        fetchData();
    }, [])


    async function updateMovie(e: React.FormEvent) {
        e.preventDefault();

        if (name && price && releaseDate) {
            const updatedMovie = {
                name: name,
                price: price,
                release_date: new Date(releaseDate)
            };

            await putMovie(id, updatedMovie);
            alert("Filme atualizado com sucesso!");
            navegar("/listMovies");
        }
    }

    return (
        <Container>
            <Paper>
                <Row>
                    <Form className="p-5" onSubmit={updateMovie}>
                        <h1 className="text-center" style={{ color: "#189995" }}>Atualizar o Filme</h1>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Nome</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setName(evt.target.value)}
                                type="text"
                                defaultValue={movie?.name}
                                placeholder="Informe o NOME"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Preço</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setPrice(Number(evt.target.value))}
                                type="number"
                                placeholder="Informe o Preço"
                                defaultValue={movie?.price}

                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data de Estreia:</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                type="date"
                                name="data"
                                value={releaseDate}
                                onChange={e => setReleaseDate(e.target.value)}
                                required
                            />
                        </InputGroup>

                        <Box className="text-end">
                            <Button type="submit" style={{ backgroundColor: "#189995", border: "none" }}>
                                Atualizar
                            </Button>
                        </Box>
                    </Form>
                </Row>
            </Paper>
        </Container>
    );
}