import React from 'react';
import "./OneSingleCard.css";
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';


class OneSingleCard extends React.Component {

    render(){
        return (
            <div className="one_card_wrapper">
                <div className="one_single_card">
                    {
                        this.props.owner === 'user' ?
                            <Glyphicon glyph="user"/>
                        :
                        <Glyphicon glyph="hdd"/>
                    }
                    <div className="horizontal_val top">{this.props.top_val}</div>
                    <div className="vertical_val right">{this.props.right_val}</div>
                    <div className="horizontal_val bottom">{this.props.bottom_val}</div>
                    <div className="vertical_val left">{this.props.left_val}</div>
                </div>
            </div>
        );
    }

}
OneSingleCard.propTypes = {
    top_val: PropTypes.number,
    right_val: PropTypes.number,
    bottom_val: PropTypes.number,
    left_val: PropTypes.number,
    owner: PropTypes.oneOf(['user', 'computer'])
};
export default OneSingleCard;