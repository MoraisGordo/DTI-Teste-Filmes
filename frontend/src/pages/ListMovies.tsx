import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Moment from "moment";
import { createSearchParams, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { deleteMovie, getMovies } from "../services/MoviesServices";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ConfirmDelete from "../components/ConfirmDelete";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Container, TextField } from "@mui/material";


export default function ListMovies() {
    const navegar = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieToDelete, setMovieToDelete] = useState<Movie>();
    const [openMovieToDelete, setOpenMovieToDelete] = useState<boolean>(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const buscaData = async () => {
            try {
                const movies = await getMovies();
                setMovies(movies)
            } catch (error) {
                console.log("Erro ao buscar filmes:", error);
            }
        };
        buscaData();
    }, [openMovieToDelete]);

    const searchedMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(search.toLowerCase())
    );

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function handleOpenDeleteMovie(movie: Movie) {
        setMovieToDelete(movie);
        setOpenMovieToDelete(true);
    }

    function handleCloseDeleteMovie() {
        setOpenMovieToDelete(false)
    }

    async function handleDeleteMovie(id: number) {
        try {
            if (openMovieToDelete) {
                await deleteMovie(id);
            }
        } catch (error) {
            console.log("Erro ao deletar o filme:", error);
        }
        handleCloseDeleteMovie();
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Paper className="p-1 mb-1" style={{ backgroundColor: "#189995" }}>
                            <Col className="justify-content-center text-center">
                                <h2 style={{ color: "#ffffff" }}>Lista de Filmes</h2>
                            </Col>
                        </Paper>
                        <Paper className="mb-2 mt-2 p-2">
                            <Row className="align-items-center g-2">
                                <TextField
                                    className="p-1"
                                    label="Pesquisar Filme"
                                    variant="outlined"
                                    fullWidth
                                    value={search}
                                    size="small"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Row>
                        </Paper>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Nome</StyledTableCell>
                                        <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Preço</StyledTableCell>
                                        <StyledTableCell style={{ backgroundColor: "#ffffff", color: "#000000" }}>Data de Lançamento</StyledTableCell>
                                        <StyledTableCell align="center" style={{ backgroundColor: "#ffffff", color: "#000000" }}>Ações</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchedMovies.map((movie) => (
                                        <StyledTableRow key={movie.id}>
                                            <StyledTableCell>{movie.name}</StyledTableCell>
                                            <StyledTableCell>{movie.price}</StyledTableCell>
                                            <StyledTableCell>{Moment(movie.release_date).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button
                                                    className="m-1"
                                                    style={{ backgroundColor: "#189995", border: "none" }}
                                                    onClick={() => navegar({
                                                        pathname: "/updateMovie",
                                                        search: createSearchParams({
                                                            id: movie.id.toString()
                                                        }).toString()
                                                    })}
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <Button
                                                    className="m-1"
                                                    style={{ backgroundColor: "#189995", border: "none" }}
                                                    onClick={() => handleOpenDeleteMovie(movie)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button
                            className="mt-3"
                            style={{ backgroundColor: "#189995", border: "none" }}
                            onClick={() => {
                                navegar({ pathname: "/newMovie" });
                            }}
                        >
                            <AddIcon sx={{ fontSize: "large" }} /> Novo Filme
                        </Button>
                    </Col>
                </Row>

                <ConfirmDelete
                    title="Deletar Filme?"
                    id={movieToDelete?.id}
                    open={openMovieToDelete}
                    onClose={handleCloseDeleteMovie}
                    onSubmitValue={(id: number) => handleDeleteMovie(id)}
                />
            </Container>
        </>
    );
}