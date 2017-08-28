import React from 'react';
import "./PlayMode.css";
import { PageHeader } from 'react-bootstrap';
import OneSingleCard from '../OneSingleCard/OneSingleCard';
import OneCardPlace from './OneCardPlace/OneCardPlace';
import _ from 'lodash';

class PlayMode extends React.Component {

    // default application state
    constructor(props){
        super(props);
        this.state = {
            myCards : null,
            selectedCard: null,
            showErrorMsg: false,
            gridData: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null
            }
        };
    }

    // take card from the local storage into the application state
    componentDidMount(){
        var cards = JSON.parse(localStorage.getItem('myCards'));
        this.setState({myCards: cards});
    }

    // select card for laying into the grid
    _markCardAsSelected(index){
        this.setState({ selectedCard: index });
    }

    // laying card into the grid
    _layingCard(key){
        if(this.state.selectedCard !== null) {
            var currGridState = this.state.gridData;
            var myCurrentCards = this.state.myCards;
            if(currGridState[key] === null) {
                currGridState[key] = myCurrentCards[this.state.selectedCard];
                myCurrentCards = _.without(myCurrentCards, myCurrentCards[this.state.selectedCard]);
                this.setState({myCards: myCurrentCards});
                this.setState({selectedCard: null});
                this.setState({gridData: currGridState});
            } else {
                this._showError();
            }
        }
    }

    // show error message when field inside the grid is not empty
    _showError(){
        if(this.state.showErrorMsg) {
            clearTimeout(this.state.showErrorMsg);
        }
        var timeout_id = setTimeout(()=>{
            clearTimeout(this.state.showErrorMsg);
            this.setState({ showErrorMsg: false });
        }, 1000);
        this.setState({ showErrorMsg: timeout_id });
    }

    // return error message view
    _errorMessage(){
        if(this.state.showErrorMsg){
            return (
                <div className="error_msg">
                    Please, choose empty field for your card.
                </div>
            );
        }
        return null;
    }

    render(){
        return(
            <div className="play_mode">
                <PageHeader>Play Mode</PageHeader>
                <div className="row">
                    <div className="col-lg-6">
                        {
                            this.state.myCards ?
                                <div className="row">
                                    {this.state.myCards.map((obj, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={ () => {this._markCardAsSelected(index)} }
                                                data-selected={ this.state.selectedCard === index }
                                                className="card_for_game clearfix"
                                            >
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
                    <div className="col-lg-6">
                        <div className="play_grid clearfix">

                            {
                                Object.keys(this.state.gridData).map((key) => {
                                    return (
                                        <OneCardPlace
                                            key={key}
                                            index={key}
                                            layingCard={this._layingCard.bind(this)}
                                            data={this.state.gridData[key]}
                                        />
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                { this._errorMessage() }
            </div>
        );
    }

}
export default PlayMode;