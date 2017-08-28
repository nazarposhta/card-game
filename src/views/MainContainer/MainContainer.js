import React from 'react';
import { cardGenerator } from '../../api/cardGenerator';


class MainContainer extends React.Component {

    componentDidMount(){
        // let's generate 5 cards for current user and save it to the local storage
        var cards = [];
        for (var i = 0; i < 5; i++) {
            cards.push(cardGenerator());
        }
        localStorage.setItem('myCards', JSON.stringify(cards));
    }

    render(){
        return(
            <div className="main_container">
                {this.props.children}
            </div>
        );
    }
}
export default MainContainer;