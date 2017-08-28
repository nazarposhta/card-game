import React from 'react';
import { Col, Row, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

class Navigation extends React.Component {

    render(){
        return(
            <Navbar>
                <Row>
                    <Col lg={12}>
                        <ul className="nav nav-pills">
                            <li>
                                <NavLink exact to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/collection">Collection</NavLink>
                            </li>
                            <li>
                                <NavLink to="/play">Play</NavLink>
                            </li>
                            <li>
                                <NavLink to="/store">Store</NavLink>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Navbar>
        );
    }
}
export default Navigation;