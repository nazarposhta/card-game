import React from 'react';
import OneSingleCard from '../OneSingleCard/OneSingleCard';
import { PageHeader } from 'react-bootstrap';
import "./CollectionMode.css";
import { fiveCardsGenerator } from '../../api/cardGenerator';

class CollectionMode extends React.Component{

    // default application state
    constructor(props){
        super(props);
        this.state = { myCards : null };
    }

    // take card from the local storage into the application state
    componentDidMount(){
        this.setState({myCards: fiveCardsGenerator()});
    }

    render(){
        return(
            <div className="collection_mode">
                <PageHeader>Card collection</PageHeader>
                    {
                        this.state.myCards ?
                            <div className="row">
                                {this.state.myCards.map((obj, index) => {
                                    return (
                                        <div key={index} className="card_for_game">
                                            <OneSingleCard
                                                owner={"user"}
                                                top_val={obj.top_val}
                                                right_val={obj.right_val}
                                                bottom_val={obj.bottom_val}
                                                left_val={obj.left_val}
                                            />
                                        </div>)
                                })}
                            </div>
                        :
                            <div className="spinner">
                                Loading...
                            </div>
                    }
            </div>
        );
    }

}
export default CollectionMode;