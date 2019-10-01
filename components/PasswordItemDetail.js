import React, { Component } from "react";
import { Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { addPasswordItemArrOnStoreAction } from "../store/actions/PasswordItemAction";
import { connect } from "react-redux";
import { Content, Form, Item, Icon, Label, Input, Button } from "native-base";
import { List, ListItem, Left, Right, Text, Switch, Picker } from 'native-base';


class PasswordItemDetail extends Component {
    constructor(props) {
      super(props);
      console.log('PasswordItemDetail constructor')
      this.state = {
        passwordItem: {
          name: '',
          username: '',
          password: ''
        },
        lengthValue: 8,
        digitValue: true,
        lowerValue: true,
        upperValue: true,
        specialValue: true
      };
    }
    

  onNameChange(value: string) {
    this.setState(prevState => ({
      passwordItem: {
        ...prevState.passwordItem,
        name: value
      }
    }));
  }
  onUsernameChange(value: string) {
    this.setState(prevState => ({
      passwordItem: {
        ...prevState.passwordItem,
        username: value
      }
    }));
  }
  onPasswordChange(value: string) {
    this.setState(prevState => ({
      passwordItem: {
        ...prevState.passwordItem,
        password: value
      }
    }));
  }

    onLengthChange(value) {
      this.setState({
        lengthValue: value
      });
    }
    onDigitChange(value) {
      this.setState({
        digitValue: value
      });
    }
    onLowerChange(value) {
      this.setState({
        lowerValue: value
      });
    }
    onUpperChange(value) {
      this.setState({
        upperValue: value
      });
    }
    onSpecialChange(value) {
      this.setState({
        specialValue: value
      });
    }

    componentWillReceiveProps(props) {
        if(props.passworditem){
            this.setState(prevState => ({
                passwordItem: {
                  ...prevState.passwordItem,
                  name: props.passworditem.name,
                  username: props.passworditem.username,
                  password: props.passworditem.password
                }
            }));
        }
    }
    
    savePasswordItemDetail = passwordItem => {
        console.log("savePasswordItemDetail" + JSON.stringify(passwordItem));
        this.props.addPasswordItemArrOnStore(passwordItem);
    };
    
  render() {
    console.log("PasswordItemDetail render passworditem:" + JSON.stringify(this.props.passworditem));
    return (
        <Content
          contentContainerStyle={{ 
            flex: 1, 
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
      <Form>
        <Item>
          <Icon name="ios-bookmark" />
          <Label>Name</Label>
          <Input
            value={this.state.passwordItem.name}
            onChangeText={this.onNameChange.bind(this)}
          />
        </Item>
        <Item inlineLabel>
          <Icon name="person" />
          <Label>Username</Label>
          <Input
            value={this.state.passwordItem.username}
            onChangeText={this.onUsernameChange.bind(this)}
          />
        </Item>
        <Item inlineLabel>
          <Icon name="key" />
          <Label>Password</Label>
          <Input
            maxLength={20}
            value={this.state.passwordItem.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
          <Button
            transparent
            onPress={() => Alert.alert('I don\'t want to bring a password into this world!')}
          >
            <Icon name="ios-create" />
          </Button>
        </Item>
      </Form>
      <List>
        <ListItem>
          <Left>
            <Text>Length</Text>
          </Left>
          <Right>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.lengthValue}
              onValueChange={this.onLengthChange.bind(this)}
            >
              <Picker.Item label="6" value={6} />
              <Picker.Item label="8" value={8} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="12" value={12} />
              <Picker.Item label="14" value={14} />
              <Picker.Item label="16" value={16} />
              <Picker.Item label="18" value={18} />
              <Picker.Item label="20" value={20} />
            </Picker>
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Digit</Text>
          </Left>
          <Right>
            <Switch
              value={this.state.digitValue}
              onValueChange={this.onDigitChange.bind(this)}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Lowercase</Text>
          </Left>
          <Right>
            <Switch
              value={this.state.lowerValue}
              onValueChange={this.onLowerChange.bind(this)}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Uppercase</Text>
          </Left>
          <Right>
            <Switch
              value={this.state.upperValue}
              onValueChange={this.onUpperChange.bind(this)}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Special Chars</Text>
          </Left>
          <Right>
            <Switch
              value={this.state.specialValue}
              onValueChange={this.onSpecialChange.bind(this)}
            />
          </Right>
        </ListItem>
      </List>
        <Button
          iconLeft
          onPress={() => {
            this.savePasswordItemDetail(this.state.passwordItem);
            this.props.navigation.navigate("HomePage");
          }}
        >
          <Icon name="save" />
          <Text>Save</Text>
        </Button>
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    passwordItems: state.PasswordItemReducer.PasswordItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPasswordItemArrOnStore: data =>
      dispatch(addPasswordItemArrOnStoreAction(data))
  };
}; 

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNavigation(PasswordItemDetail));
