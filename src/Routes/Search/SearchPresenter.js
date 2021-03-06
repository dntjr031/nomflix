import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Section from '../../Components/Section';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    padding: 20px;
`;
const Form = styled.form`
    margin-bottom: 50px;
`;
const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 24rem;
`;

const SearchPresenter = ({
    movieResults,
    tvResults,
    searchTerm,
    loading,
    error,
    handleSubmit,
    updateTerm,
}) => (
    <Container>
        <Helmet>
            <title>Search | Nomflix</title>
        </Helmet>
        <Form onSubmit={handleSubmit}>
            <Input
                placeholder="Search Movies or TV Show..."
                value={searchTerm}
                onChange={updateTerm}
            />
        </Form>
        {loading ? (
            <Loader />
        ) : (
            <>
                {movieResults && movieResults.length > 0 && (
                    <Section title="Movie Results">
                        {movieResults.map((movie) => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                rating={movie['vote_average']}
                                isMovie
                                imageUrl={movie['poster_path']}
                                year={
                                    movie['release_date'] && movie['release_date'].substring(0, 4)
                                }
                            />
                        ))}
                    </Section>
                )}
                {tvResults && tvResults.length > 0 && (
                    <Section title="TV Results">
                        {tvResults.map((show) => (
                            <Poster
                                key={show.id}
                                id={show.id}
                                title={show['original_name']}
                                rating={show['vote_average']}
                                imageUrl={show['poster_path']}
                                year={
                                    show['first_air_date'] && show['first_air_date'].substring(0, 4)
                                }
                            />
                        ))}
                    </Section>
                )}
            </>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && (
            <Message color="#95a5a6" text="Nothing found" />
        )}
    </Container>
);

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
