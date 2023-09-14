import React from "react";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UM COS420 with React Hooks and TypeScript
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload. Zach Hello World
            </p>
            <h1>Header</h1>
            <img src="/assets/images/capture.jpg" alt="A picture" />
            <ul>
                <li>First thing</li>
                <li>Another thing</li>
                <li>A third item</li>
            </ul>
            <Button>Hello World</Button>
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World
            </Button>
            <Container>
                <Row>
                    <Col>
                        <div id="rect"></div>
                    </Col>
                    <Col>
                        <div id="rect"></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
