
var Layout = require('./layout.jsx');
var React = require('react');

module.exports = React.createClass({

    render: function render() {

        return (
            <Layout {...this.props}>
                <div className="jumbotron col-sm-6 pull-center">
                    <form action="/add" method="post">
                        <div>
                            <label>Add Notes</label>
                            <textarea rows="4" cols="50" name="content">
                Add your notes here!
                </textarea>
                        </div>
                        <div>
                            <input className="btn btn-primary" type="submit" value="Add"/>
                        </div>
                    </form>
                </div>
            </Layout>
        );
    }
});