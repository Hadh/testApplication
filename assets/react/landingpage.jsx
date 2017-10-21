var React = require('react'),
ReactDOM = require('react-dom');

var $ = require ('jquery');

/*************************************************************
*************************************************************/


var ContactForm = React.createClass({

  getInitialState: function () {
    return {
      theForm:{
        name : '',
        message: '',
        email: ''
      }
    };
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  saveContactInfo:function (data) {
    $.ajax({
      url: "/saveContactInfo",
      dataType: 'json',
      type: 'POST',
      data:data,
      success: function(result) {
       console.log("All Clear!")
      },
      error: function(xhr, status, err) {
        console.log("Mission Failed!")
      }
    });
  },

/*function to merge 2 objects*/
  extend: function(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
},

  changeHandler:function(e){
    /*detecting change and updating state of the form */
    var result = this.extend(this.state.theForm, { [e.target.name]: e.target.value })
    this.setState({ theForm: result })
    },

  submitHandler:function(e){
    /* Preventing form from refreshing */
    e.preventDefault();
    /* Checking valid input from user*/
    if(this.state.theForm.name.length < 1 || this.state.theForm.message.length < 1){
      alert('Young padawan, y u no insert Data?');
      return false;
    }

    console.log("Submiting done!")
    console.log(this.state.theForm)
    /* Calling SaveContactInfo with the form data*/
    this.saveContactInfo(this.state.theForm);
  },

  render: function() {
    return (
     <div className="jumbotron">  
        <br/>

        <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <form onSubmit={this.submitHandler} action="" method="post" className="form-horizontal">
                    <div className="get-in-touch">
                        <h3 className="text-center">Hi there, Leave us a message!</h3>
                        <hr/>
                        
            <div className="form-group">
                <label htmlFor="name" className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                  <input onChange={this.changeHandler} value={this.state.theForm.name} name="name" type="text" className="form-control" id="name" placeholder="John Travolta"/>
                </div>
            </div>
                        
            <div className="form-group">
                <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                <div className="col-sm-10">
                  <input onChange={this.changeHandler} value={this.state.theForm.email} name="email" type="email" className="form-control" id="email" placeholder="someone@example.com"/>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="message" className="col-sm-2 control-label">Message</label>
                <div className="col-sm-10">
                  <textarea onChange={this.changeHandler} value={this.state.theForm.message} name="message" id="message" rows="9" className="form-control"></textarea>
                </div>
            </div>
            
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-danger btn-sm pull" role="button">Send Message</button>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>

     </div>
     );
  }

}); 




ReactDOM.render(
  <ContactForm/>,
  document.getElementById('containerHome')
  );



