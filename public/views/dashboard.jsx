
var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({

    render: function render() {

        return (
            <Layout {...this.props}>
                <h1>Hi, Welcome to your Dashboard</h1>
                <h2>Here are your recent entries</h2>
                <ul>
                    <li>blah</li>
                </ul>
            </Layout>
        );
    }
});