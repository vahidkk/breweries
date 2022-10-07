import React, { useState } from 'react';
import { Button, Header, Image, Modal, Divider, Icon, Table } from 'semantic-ui-react';
function ModalWindow(props) {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={props.children}
        >
            <Modal.Header
                style={{
                    backgroundColor: '#E5E5E5',
                }}
            >
                {props.data.name}
            </Modal.Header>
            <Modal.Content
                image
                style={{
                    backgroundColor: '#E5E5E5',
                }}
            >
                <Image size="medium" src="/250l-brewing-kit.jpg" wrapped />
                <Modal.Description>
                    <>
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="tag" />
                                {props.data.name}
                            </Header>
                        </Divider>

                        <p>
                            Company Address:{' '}
                            {props.data.street +
                                ' , ' +
                                props.data.city +
                                ' ' +
                                props.data.state +
                                ' ' +
                                props.data.country +
                                ' ' +
                                props.data.postal_code}
                        </p>

                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="bar chart" />
                                Specifications
                            </Header>
                        </Divider>

                        <Table definition>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={4}>Type:</Table.Cell>
                                    <Table.Cell>{props.data.brewery_type}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Phone:</Table.Cell>
                                    <Table.Cell>{props.data.phone}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>ZIP Code:</Table.Cell>
                                    <Table.Cell>{props.data.postal_code}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Date Added:</Table.Cell>
                                    <Table.Cell>
                                        {new Date(props.data.created_at).toLocaleString('en-US')}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions
                style={{
                    backgroundColor: '#E5E5E5',
                }}
            >
                <Button
                    content="Close"
                    labelPosition="right"
                    icon="remove"
                    onClick={() => setOpen(false)}
                    color="brown"
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalWindow;
