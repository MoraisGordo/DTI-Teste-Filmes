import { Box, Container, Paper } from "@mui/material";
import { useState } from "react";
import { Button, InputGroup, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { postMovie } from "../services/MoviesServices";
import { useNavigate } from "react-router";


export default function NewMovie() {
    const navegar = useNavigate();
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [releaseDate, setReleaseDate] = useState<string>('');


    async function createMovie(e: React.FormEvent) {
        e.preventDefault();

        if (name && price && releaseDate) {
            const newMovie = {
                name,
                price,
                release_date: new Date(releaseDate)
            };

            await postMovie(newMovie);
            alert("Filme cadastrado com sucesso!");
            navegar("/listMovies");
        }
    }

    return (
        <Container>
            <Paper>
                <Row>
                    <Form className="p-5" onSubmit={createMovie}>
                        <h1 className="text-center" style={{ color: "#189995" }}>Cadastro de Filmes</h1>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Nome</InputGroup.Text>
                            <Form.Control
                                onChange={(evt) => setName(evt.target.value)}
                                type="text"
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

                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Data de Estreia:</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                type="date"
                                name="data"
                                onChange={e => setReleaseDate(e.target.value)}
                                required
                            />
                        </InputGroup>

                        <Box className="text-end">
                            <Button type="submit" style={{ backgroundColor: "#189995", border: "none" }}>
                                Cadastrar
                            </Button>
                        </Box>
                    </Form>
                </Row>
            </Paper>
        </Container>
    );
}