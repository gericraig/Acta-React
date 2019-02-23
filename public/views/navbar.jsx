var React = require('react');
module.exports = React.createClass({

    displayName: 'navbar',

    render: function render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="/">Home</a></li>
                            <li><a href="/signup">Sign Up</a></li>
                            <li><a href="/dashboard">Dashboard</a></li>
                            <li><a href="/add">Add Entry</a></li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/login">Log In</a></li>
                            <li><a href="/logout">Log Out</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});
