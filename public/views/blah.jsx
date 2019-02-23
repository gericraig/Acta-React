var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({

    render: function render() {

        return (
            <Layout {...this.props}>
                <h2>BLAH</h2>
                <p>Another example of a plain server-side ReactJS page.</p>
            </Layout>
        );
    }
});
