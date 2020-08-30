import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface IProps {
    data: string,
    dispatch: Dispatch,
}
class About extends Component {
    constructor(props: IProps){
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount() {
        if (!this.props.data) {

        }
    }

    static loadData() {
        return new Promise((resolve, reject) => {
            axios.get('http:/localhost:3000/getData').then((res) => {
                resolve(res.data.data);
            });
        })
    }

    render() {
        return (
            <div>{this.props.data}</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
    }
}

function mapDispatchToProps(dispatch) {
    return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(About);
