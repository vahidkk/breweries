import React from 'react';

import { Segment, Image, Dimmer, Loader, Button } from 'semantic-ui-react';

export default function FetchingLoader({ props }) {
    return (
        <div style={{ marginBottom: '65px' }}>
            {!props && (
                <Button fluid>
                    <Segment>
                        <Dimmer active>
                            <Loader content="Loading" />
                        </Dimmer>

                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </Button>
            )}
        </div>
    );
}
