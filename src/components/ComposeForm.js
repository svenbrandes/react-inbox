import React,{Component} from 'react';

class ComposeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            body: ""
        }
    }

    onChange = e => this.setState({[e.target.id]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        this.props.sendMsg(this.state);
        this.setState({subject:"", body:""});
    }

    render() {
        return (
            <form className="form-horizontal well" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject"
                               name="subject" onChange={this.onChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control" onChange={this.onChange}></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary" onClick={this.onSubmit} />
                    </div>
                </div>
            </form>
        )
    }
}

export default ComposeForm;