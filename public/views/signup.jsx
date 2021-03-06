var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({

    render: function render() {

        return (
            <Layout {...this.props}>
                <div className="jumbotron col-sm-4 pull-center">
                    <form action="/signup" method="post">
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username"/>
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="text" name="email"/>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            <input className="btn btn-primary" type="submit" value="Sign Up"/>
                        </div>
                    </form>
                </div>
            </Layout>
        );
    }
});
