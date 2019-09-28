import React, { Component } from 'react';
import { List } from 'native-base';
import PasswordItem from './PasswordItem';

export default class PasswordItemList extends Component {
    
    render() {
        return (
            <List>
                <PasswordItem navigatePasswordItemDetail = {this.props.navigatePasswordItemDetail}/>
                    <PasswordItem />
                        <PasswordItem />
                            <PasswordItem />
            </List>
        );
    }
}
