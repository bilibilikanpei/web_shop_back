import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../../redux/action'
import Good from './Good';
class GoodList extends Component {
    componentDidMount() {
        // this.props.getList();
    }
    render() {
        console.log(this.props.goodsList)
        return (
            <div className="content_goods">
                {this.props.goodsList.map(
                    (item, index) => (
                        <Good imgSrc={item.imgSrc}
                            name={item.name}
                            price={item.price}
                            key={index}
                        ></Good>
                    )
                )}
            </div>
        );
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(GoodList);
function mapStateToprops(state, ownProps) {
    return {
        goodsList: state.goodsList
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        getList: function () {
            dispatch(fetchList);
            function fetchList(dispatch, getState) {
                dispatch(Action.getList);
                return fetch('http://localhost:3000/goodsList').
                    then(response => {
                        return response.json();
                    }).
                    then(response => {
                        dispatch(Object.assign({}, Action.getList_OK, { response: response }));
                    })
            }
        }
    }
}