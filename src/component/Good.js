import React, { Component } from 'react';

class Good extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="good">
                <img className={'goodImg'} src={this.props.imgSrc} alt="没有图片" />
                <span className="goodName">{this.props.name}</span>
                <span className="goodPrice">{this.props.price}</span>
            </div>
        );
    }
}

export default Good;