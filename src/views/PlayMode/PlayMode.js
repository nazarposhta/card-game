import React from 'react';
import "./PlayMode.css";
import { PageHeader } from 'react-bootstrap';
import OneSingleCard from '../OneSingleCard/OneSingleCard';
import OneCardPlace from './OneCardPlace/OneCardPlace';
import _ from 'lodash';
import { fiveCardsGenerator } from '../../api/cardGenerator';

class PlayMode extends React.Component {

    // default application state
    constructor(props){
        super(props);
        this.state = {
            cpuCards: null,
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

    componentDidMount(){
        this._generateNewGame();
    }

    _generateNewGame(){
        this.setState({
            myCards: fiveCardsGenerator('user'), // cards for user
            cpuCards: fiveCardsGenerator('computer'), //cards for computer
            gridData: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null } // grid state
        });
    }

    // let's update our grid after action
    _gridUpdater(cell, data){
        var currOwner = data.owner;
        var currGridState = this.state.gridData;
        if(currGridState[cell] === null) {
            var prev = currGridState[cell - 1];
            var next = currGridState[cell + 1];
            var above = currGridState[cell - 3];
            var under = currGridState[cell + 3];

            if(prev){
                if(prev.right_val < data.left_val){
                    currGridState[cell - 1].owner = currOwner;
                }
            }
            if(next){
                if(next.left_val < data.right_val){
                    currGridState[cell + 1].owner = currOwner;
                }
            }
            if(above){
                if(above.bottom_val < data.top_val){
                    currGridState[cell - 3].owner = currOwner;
                }
            }
            if(under){
                if(under.top_val < data.bottom_val){
                    currGridState[cell + 3].owner = currOwner;
                }
            }

            currGridState[cell] = data;
            this.setState({gridData: currGridState});
            return true;
        }
        return false;
    }

    // define empty cell for CUP turn
    _selectCellByCPU(){
        var currGrid =  this.state.gridData;
        for (var obj in currGrid) {
            if(currGrid[obj] === null){
                return obj;
            }
        }
    }

    // laying card into the grid by CPU
    _layingCardCPU(){
        var cpuCurrentCards = this.state.cpuCards;
        var emptyCell = this._selectCellByCPU();
        var handleUpdate = this._gridUpdater(emptyCell, cpuCurrentCards[0]);
        if(handleUpdate) {
            cpuCurrentCards = _.without(cpuCurrentCards, cpuCurrentCards[0]);
            this.setState({cpuCards: cpuCurrentCards});
        }
    }

    // select card for laying into the grid
    _markCardAsSelected(index){
        this.setState({ selectedCard: index });
    }

    // laying card into the grid by user
    _layingCard(key){
        if(this.state.selectedCard !== null) {
            var myCurrentCards = this.state.myCards;
            var handleUpdate = this._gridUpdater(key, myCurrentCards[this.state.selectedCard]);
            if(handleUpdate) {
                myCurrentCards = _.without(myCurrentCards, myCurrentCards[this.state.selectedCard]);
                this.setState({myCards: myCurrentCards});
                this.setState({selectedCard: null});

                if(myCurrentCards.length === 0){
                    var stateOfGrid = this.state.gridData;
                    var cpuScore = 0;
                    for (var obj in stateOfGrid) {
                        (stateOfGrid[obj].owner === 'computer') ? cpuScore+=cpuScore : cpuScore=cpuScore;
                    }
                    if(cpuScore > 4){
                        alert('You lose!');
                    } else {
                        alert('You won!')
                    }
                    this._generateNewGame();
                } else {
                    // CPU turn half second after user
                    setTimeout(() => {
                        this._layingCardCPU();
                    }, 500);
                }

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
                                                    owner={obj.owner}
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