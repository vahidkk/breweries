import React from 'react';

import { Container } from 'semantic-ui-react';

import Header from '../../components/Header';
import HomePage from '../HomePage';

export default function App() {
    return (
        <div
            style={{
                backgroundColor: '#E5E5E5',
                minHeight: '100vh',
                paddingTop: '100px',
            }}
        >
            <Container>
                <Header />
                <HomePage />
            </Container>
        </div>
    );
}
