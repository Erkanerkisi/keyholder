import React, { Component } from "react";
import { Content } from "native-base";
import { connect } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { translate } from "../language/TranslateService";
import { deletePasswordItemArrOnStoreAction } from "../store/actions/PasswordItemAction";
import CategorizedSubList from "./common/CategorizedSubList";

var _ = require("lodash");

class PasswordItemList extends Component {
  deletePasswordItemDetail = passwordItem => {
    this.props.deletePasswordItemArrOnStore(passwordItem);
  };

  renderCategories = () => {
    var uniqueArray = _.uniq(_.map(this.props.passwordItems, "category"));
    var returnObject  = uniqueArray.map(uniq => {
      data = _.filter(this.props.passwordItems,(e) => e.category == uniq);
      return (
        <CategorizedSubList
          key = {uniq}
          data={data}
          categoryIcon = {translate(uniq)}
          categoryName = {translate("password.category." + uniq)}
          deletePasswordItemDetail={this.deletePasswordItemDetail}
        />
      );
    });
    return returnObject;
  };

  render() {
    return <Content>{this.renderCategories()}</Content>;
  }
}

const mapStateToProps = state => {
  return {
    language: state.PasswordItemReducer.language
  };
};


const mapDispatchToProps = dispatch => {
  return {
    deletePasswordItemArrOnStore: data =>
      dispatch(deletePasswordItemArrOnStoreAction(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordItemList);
