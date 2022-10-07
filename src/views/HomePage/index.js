import React, { useState } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import UseInfinitePagination from '../../hook/useInfinitePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalWindow from '../../components/Modal';
import SemanticSearch from '../../components/Search';
import EachItem from '../../components/EachItem';
import FetchingLoader from '../../components/FetchingLoader';
export default function HomePage() {
    const [searchResult, setSearchResult] = useState(null);
    const [myState, setMyState] = useState(0);
    const [filters, setFilters] = useState({ USAFilter: false, closedFilter: false });
    const fulfilFilters = (item) => {
        // this function is responsible of checking filter criterias for each item .
        return (
            ((filters.closedFilter && item.brewery_type !== 'closed') || !filters.closedFilter) &&
            ((filters.USAFilter && item.country.includes('United States')) || !filters.USAFilter)
        );
    };
    const { data, size, setSize, error } = UseInfinitePagination(
        //using this custom hook to fetch each batch of data
        process.env.REACT_APP_LIST_BREWIES,
    );
    if (!data) return 'loading...';
    let totalItems = 0;
    for (let i = 0; i < data.length; i++) {
        totalItems += data[i].length;
    }
    return (
        <div style={{ paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <SemanticSearch
                    func={setSearchResult}
                    filters={filters}
                    fulfilFilters={fulfilFilters}
                />
                <Form>
                    <Form.Group>
                        <Form.Field
                            onChange={() =>
                                setFilters({ ...filters, USAFilter: !filters.USAFilter })
                            }
                            checked={filters.USAFilter}
                            control={Checkbox}
                            label={{ children: 'Show only breweries inside United States' }}
                        />
                        <Form.Field
                            onChange={() =>
                                setFilters({ ...filters, closedFilter: !filters.closedFilter })
                            }
                            checked={filters.closedFilter}
                            control={Checkbox}
                            label={{ children: 'Hide closed breweries' }}
                        />
                    </Form.Group>
                </Form>
            </div>
            {!searchResult && (
                <p style={{ marginTop: '45px' }}>
                    {totalItems} breweries is listed. Scroll down to load more items automatically!
                </p>
            )}
            {/* <button
                onClick={() => {
                    setSize(size + 1);
                }}>
                Load More
            </button> */}
            <div style={{ marginTop: '45px' }}>
                <InfiniteScroll
                    next={() => {
                        setSize(size + 1);
                        setMyState(myState + 1);
                    }}
                    hasMore={true}
                    // loader={<Loader />}
                    loader={<FetchingLoader props={searchResult} />}
                    endMessage={<p>You have loaded all the data!</p>}
                    dataLength={totalItems}
                >
                    {searchResult && searchResult.errorOccured ? (
                        'Error occured: ' + searchResult.errorOccured
                    ) : searchResult && fulfilFilters(searchResult.newSelection) ? (
                        <ModalWindow data={searchResult.newSelection}>
                            <span>
                                <EachItem data={searchResult.newSelection} />
                            </span>
                        </ModalWindow>
                    ) : error ? (
                        'Error occured: ' + error
                    ) : searchResult && !fulfilFilters(searchResult.newSelection) ? (
                        'Nothing to show here !'
                    ) : (
                        data.map((items) => {
                            // since I'm using infinite scrol fetching method, I need to map all the batches of fetched data and then map each batch's content . Every time item scrolls down a new batch of data is being fetched. for example after 3 times scrolling down, 'data' will be an array of 3 members which each member is an array of 35 members ( each one is a brewery)
                            return items.map(
                                // mapping each batch of fetched data
                                (item) =>
                                    //implementing current filters which item selected
                                    fulfilFilters(item) && (
                                        <div key={item.id}>
                                            <ModalWindow data={item}>
                                                <span>
                                                    <EachItem data={item} />
                                                </span>
                                            </ModalWindow>
                                        </div>
                                    ),
                            );
                        })
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
}
