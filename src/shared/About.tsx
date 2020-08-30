import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

interface IProps {
    data: string,
}
class About extends Component<IProps> {
    state = {
        data: ""
    }

    static loadData = (store) => {
        return new Promise((resolve) => {
            axios.get('http://localhost:3000/getData').then((res) => {
                console.log("----------", res);
                store.dispatch({
                    type: "CHANGE_DATA",
                    payload: {
                        data: res.data.data,
                    }
                })
                resolve(res.data.data);
            });
        })
    }

    componentDidMount() {
        if(!this.props.data) {
            axios.get('/getData').then((res) => {
                console.log(res);
                this.setState({ data: res.data.data });
            });
        }
    }

    render() {
        return (
        <div>{this.state.data}TTTTTT{this.props.data}</div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

const mapStateToProps = (state) => {
    console.log(state);
    return { data: state.data }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
