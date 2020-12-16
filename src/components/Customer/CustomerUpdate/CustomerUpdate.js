import { Button, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCustomer } from '../../../Redux/Customer/customerActions';


import style from "./CustomerUpdate.module.css"
 class CustomerUpdate extends Component {


   

    componentDidMount = () => {
        var {match:{params:{id}}, customer, getCustomer} = this.props

        getCustomer(id)
    }
        
       
    handleFormInput = (event) => {
      var { name, value } = event.target;
      this.setState({ [name]: value });
      if (value == "") {
        this.setState({ [name + "Error"]: "Field Should not be empty" });
      } else {
        this.setState({ [name + "Error"]: "" });
      }
    };
  
    hanldeContactsInput = (e, i) => {
      let updatedContacts = this.state.subContacts.slice();
      updatedContacts[i][e.target.name] = e.target.value;
      this.setState({ subContacts: updatedContacts });
    };
    addContacts = () => {
      console.log("add");
      if (this.state.subContacts[0].name && this.state.subContacts[0].phone && this.state.subContacts[0].email) {
        this.setState({
          subContacts: [
            ...this.state.subContacts,
            {
              name:"",
              phone: "",
              email: "",
            },
          ],
        });
      }
    };
    render() {
        var {match:{params:{id}}} = this.props
        var {customer} = this.props
        console.log(customer)

        console.log(id)
        return (
           customer &&  <div className={style.formStyle}
           >
             <div className={style.form}>
             
                 <h3 className={style.head}>Edit Customer</h3>
               
               <div>
                 <form onSubmit={this.mySubmitHandler}>
                   <TextField
                     variant="outlined"
                     required
                     style={{ margin: "1rem 2rem", width: "92%" }}
                     id="firstName"
                     size="small"
                     label="First Name"
                     name="firstName"
                     autoComplete="firstName"
                     autoFocus
                     // error={this.state.firstNameError}
                     value={customer.firstName}
                     onChange={this.handleFormInput}
                   />
     
                   {/* {this.state.firstNameError ? (
                                 <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                     {this.state.firstNameError}
     
     
     
                                 </div>) : null} */}
     
                   <TextField
                     variant="outlined"
                     required
                     style={{ margin: "1rem 2rem", width: "92%" }}
                     required
                     id="lastName"
                     size="small"
                     label="Last Name"
                     name="lastName"
                     autoComplete="lastName"
                     // error={this.state.lastNameError}
                     value={customer.lastName}
                     onChange={this.handleFormInput}
                   />
                   {/* {this.state.lastNameError ? (
                                 <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                     {this.state.lastNameError}
     
                                 </div>) : null} */}
     
                   <TextField
                     variant="outlined"
                     required
                     style={{ margin: "1rem 2rem", width: "92%" }}
                     required
                     size="small"
                     id="phone"
                     label="Phone Number"
                     name="phone"
                     autoComplete="phone"
                     // error={this.state.phoneNumberError}
                     value={customer.phone}
                     onChange={this.handleFormInput}
                   />
                   {/* {this.state.phoneNumberError ? (
                                 <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                     {this.state.phoneNumberError}
     
     
     
                                 </div>) : null} */}
     
                   <TextField
                     variant="outlined"
                     required
                     style={{ margin: "1rem 2rem", width: "92%" }}
                     required
                     size="small"
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     // error={this.state.emailError}
                     value={customer.email}
                     onChange={this.handleFormInput}
                   />
 
                 </form>
                 <h5 style={{ margin: "0 2rem" }}>Alternate Contact</h5>
                 {customer.subContacts?.map((x, i) => {
                   return (
                     <div key={i}>
                       <form>
                         {/* <InputLabel htmlFor ="phone_number">Phone Number</InputLabel>
                                             <Input  id="phone_number" name="phone" value={this.state.subContacts[i].phone} onChange={(e) => this.hanldeContactsInput(e, i)} /> */}
     
                         <TextField
                           variant="outlined"
                           required
                           style={{ margin: "1rem 2rem", width: "92%" }}
                           size="small"
                           // required
     
                           id="name"
                           label="Name"
                           name="name"
                           autoComplete="name"
                           //   error={this.state.subContactPhoneError}
                           value={customer.subContacts[i].name}
                           onChange={(e) => this.hanldeContactsInput(e, i)}
                         />
     
                         <TextField
                           variant="outlined"
                           required
                           style={{ margin: "1rem 2rem", width: "92%" }}
                           size="small"
                           // required
     
                           id="phone_number"
                           label="Phone Number"
                           name="phone"
                           autoComplete="phone_number"
                         //   error={this.state.subContactPhoneError}
                           value={customer.subContacts[i].phone}
                           onChange={(e) => this.hanldeContactsInput(e, i)}
                         />
     
                         {/* <InputLabel htmlFor="emailalt">Email address</InputLabel>
                                             <Input type="email" id = "emailalt"  name="email" value={this.state.subContacts[i].email} onChange={(e) => this.hanldeContactsInput(e, i)} /> */}
                         {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                         <TextField
                           variant="outlined"
                           required
                           style={{ margin: "1rem 2rem", width: "92%" }}
                           // required
     
                           id="emailalt"
                           label="Email Address"
                           size="small"
                           name="email"
                           autoComplete="emailalt"
                         //   error={this.state.subContactEmailError}
                           value={customer.subContacts[i].email}
                           onChange={(e) => this.hanldeContactsInput(e, i)}
                         />
                       </form>
                     </div>
                   );
                 })}
                 <div className="form-group">
                   <div
                     style={{ float: "right", marginRight: "2.2rem" }}
                     className="row"
                   >
                     {/* <input type="button" className="btn btn-primary" name="Add Another" value="Add Another" onClick={this.addClaim} /> */}
                     <Button
                       onClick={this.addContacts}
                       style={{
                         background: "#00ADEE",
                         textTransform: "none",
                         color: "#FFF",
                         fontFamily: "sans-serif",
                       }}
                     >
                       Add Another
                     </Button>
                   </div>
                 </div>
                
                 <Button
                   onClick={this.mySubmitHandler}
                   className={style.button}
                      
                   
                   style={{
                     background: "#00ADEE",
                     marginBottom: "1rem",
                     marginLeft: "1rem",
                     marginRight: "0",
                     width: "92%",
                     textTransform: "none",
                     color: "#FFF",
                     fontFamily: "sans-serif",
                   }}
                 >
                   Submit
                 </Button>
                 {/* <button onClick={this.mySubmitHandler} type='button' className={style.button}>Sign In</button> */}
                 {/* </div> */}
                 {/* </div> */}
               </div>
             </div>
           </div>
        )
    }
}
var mapStateToProps = (state) =>({
  customer: state.customers.data ? state.customers.data.customer : null,

})
var actions = {
    getCustomer
}

export default connect(mapStateToProps, actions)(CustomerUpdate)
