
var Layout = require('./layout.jsx');
var React = require('react');
var ReactDOM = require('react-dom');

const updatedList = this.props.entrees.map((content)=>{
    return <li>{content}</li>;
});

module.exports = React.createClass({

    render: function render() {

        return (
            <Layout {...this.props}>
                <h1>Hi, Welcome to your Dashboard</h1>
                <h2>Here are your recent entries</h2>
                <ul>
                    {updatedList}
                </ul>
            </Layout>
        );
    }
});