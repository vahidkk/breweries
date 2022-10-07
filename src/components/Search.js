import _ from 'lodash'; // Semantic UI Search Module uses lodash, that is why lodash is being imported here.
import React, { useState, useRef, useReducer, useCallback, useEffect } from 'react';
import { Search, Grid, Label } from 'semantic-ui-react';

// This component is being copied from Semantic UI Search Module that is why you don't see much documentation and comments, I just made few changes to make it compatible with filters criteria
const initialState = {
    loading: false,
    results: [],
    value: '',
};
function searchReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState;
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query };
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results };
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection };
        default:
            throw new Error();
    }
}
const resultRenderer = ({ name }) => <Label content={name} />;

function SemanticSearch(props) {
    const [sourceOfResults, setSourceOfResults] = useState(null);
    const [newError, setNewError] = useState(null);

    const fetchingSearchResult = (e, data) => {
        fetch(
            `${process.env.REACT_APP_LIST_BREWIES}/search?query=${e.replaceAll(
                ' ',
                '%20',
            )}&per_page=35`,
        )
            .then((res) => res.json())
            .then((response) => setSourceOfResults(response))
            .catch((err) => {
                console.log(err.message);
                setNewError(err.message);
            });
    };
    const [state, dispatch] = useReducer(searchReducer, initialState);
    const { loading, results, value } = state;

    const timeoutRef = useRef();

    const handleSearchChange = useCallback(
        (e, data) => {
            fetchingSearchResult(data.value);
            clearTimeout(timeoutRef.current);
            dispatch({ type: 'START_SEARCH', query: data.value });

            timeoutRef.current = setTimeout(() => {
                if (data.value.length === 0) {
                    dispatch({ type: 'CLEAN_QUERY' });
                    props.func(newError ? { errorOccured: newError } : null); //if user cleared the search form, we should tell the parent component that no search result is selected anymore
                    return;
                }

                const re = new RegExp(_.escapeRegExp(data.value), 'i');
                const isMatch = (result) => re.test(result.name);

                dispatch({
                    type: 'FINISH_SEARCH',
                    results: _.filter(sourceOfResults, isMatch),
                });
            }, 300);
        },
        [sourceOfResults],
    );

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Grid>
            <Grid.Column width={6}>
                <Search
                    loading={loading}
                    placeholder="Search..."
                    onResultSelect={(e, data) => {
                        let newSelection = data.result; // newSelection is the item which user clicks on it from search dropdown.
                        dispatch({ type: 'UPDATE_SELECTION', selection: data.result.name });
                        props.func(
                            newError
                                ? { errorOccured: newError }
                                : { errorOccured: null, newSelection },
                        ); // React data-flow is unidirectional but I used a little trick to avoid using useContext. Now I'm sending data through a function from child component to parent component. I wouldn't have done this if this was not a demo project ;)
                    }}
                    onSearchChange={handleSearchChange}
                    resultRenderer={resultRenderer}
                    results={
                        sourceOfResults
                            ? sourceOfResults.filter((x) => props.fulfilFilters(x)) // we need to check to see if the result is compatible with filter criteria. I'm using the fulfilFilter function from parent component
                            : null
                    }
                    value={value}
                />
            </Grid.Column>
        </Grid>
    );
}

export default SemanticSearch;
