import React from 'react';
import OneSingleCard from '../../OneSingleCard/OneSingleCard';

class OneCardPlace extends React.Component {

    render(){
        return (
            <div onClick={ () => { this.props.layingCard(this.props.index) } } className="one_card_place">
                {
                    this.props.data ?
                        <OneSingleCard
                            owner={this.props.data.owner}
                            top_val={this.props.data.top_val}
                            right_val={this.props.data.right_val}
                            bottom_val={this.props.data.bottom_val}
                            left_val={this.props.data.left_val}
                        />
                    :
                        null
                }

            </div>
        )
    }

}
export default OneCardPlace;