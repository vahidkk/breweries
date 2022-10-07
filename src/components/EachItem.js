import React from 'react';

import { Segment, Header, Button, List } from 'semantic-ui-react';

export default function EachItem({ data }) {
    return (
        <List divided verticalAlign="middle">
            <Button fluid>
                <Segment
                    inverted
                    // changing each Item's color based on the type of breweries
                    tertiary={data.brewery_type === 'large'}
                    secondary={data.brewery_type === 'micro'}
                    color={
                        data.brewery_type === 'closed'
                            ? 'white'
                            : data.brewery_type === 'planning'
                            ? 'grey'
                            : 'brown'
                    }
                    style={{
                        textDecoration: data.brewery_type === 'closed' ? 'line-through' : '',
                    }}
                >
                    <Segment floated="right" circular>
                        <Header
                            size="tiny"
                            color={
                                data.brewery_type === 'closed'
                                    ? 'white'
                                    : data.brewery_type === 'planning'
                                    ? 'grey'
                                    : 'brown'
                            }
                        >
                            {data.brewery_type}
                        </Header>
                    </Segment>
                    <Segment circular inverted>
                        <Header size="medium">{data.name}</Header>
                    </Segment>
                </Segment>
            </Button>
        </List>
    );
}
