import React, {Component} from 'react';
import UserProfile from '../UserProfile';

export class Placeholder extends Component{
    
    render(){

        var name = UserProfile.getUser().username;
        if(name === null){
            name = '';
        }
        return(
            <div>
                <h3> Welcome {name} </h3>
            </div>
        );
    }
}

export default Placeholder;