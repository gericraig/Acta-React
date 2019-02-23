var React = require('react');
var Navbar = require('./navbar.jsx');
var Htmlhead = require('./htmlhead.jsx');

module.exports = React.createClass({

    render: function render() {
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
                <Htmlhead/>
            </head>
            <body className="container">
            <div className="page-header">
                <h1>{this.props.heading}</h1>
            </div>
            <Navbar/>
            <div className="container row">
                {this.props.children}
            </div>
            </body>
            </html>
        );
    }
});