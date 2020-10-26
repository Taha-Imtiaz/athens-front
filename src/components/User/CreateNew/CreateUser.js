import React, { Component } from "react";
import style from "./CreateUser.module.css";
import Button from "../../Button/Button";
import { Multiselect } from "multiselect-react-dropdown";
import { createUser } from "../../../Redux/User/userActions";
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { showMessage } from '../../../Redux/Common/commonActions'

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: "",
  attributes: "",
  nameError: "",
  emailError: "",
  numberError: "",
  addressError: "",
  typeError: "",
  attributeError: "",
};

class CreateUser extends Component {
  typeOptions = [
    { name: "Manager", id: 1 },
    { name: "Mover", id: 2 },
  ];
  attributeOptions = [
    { name: "Attribute 1" },
    { name: "Attribute 2" },
    { name: "Attribute 3" },
  ];

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onTypeSelect = (selectedList, selectedItem) => {
    this.setState({ type: selectedItem });
  };

  onAttributeSelect = (selectedList, selectedItem) => {
    this.setState({ attributes: selectedItem });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let numberError = "";
    let addressError = "";
    let typeError = "";
    let attributeError = "";

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.name) {
      nameError = "Name should not be empty";
    }

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (!this.state.phone) {
      numberError = "Number should not be empty";
    }

    if (!this.state.address) {
      addressError = "Address should not be empty";
    }

    if (!this.state.type) {
      typeError = "Type should not be empty";
    }

    if (!this.state.attributes) {
      attributeError = "Attribute should not be empty";
    }

    if (
      nameError ||
      emailError ||
      numberError ||
      addressError ||
      typeError ||
      attributeError
    ) {
      this.setState({
        nameError,
        emailError,
        numberError,
        addressError,
        typeError,
        attributeError,
      });
      return false;
    }

    return true;
  };

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    var { showMessage, history } = this.props;

    if (isValid) {
      var { name, phone, email, address, type, attributes } = this.state;
      var createdUserObj = {
        name,
        phone,
        address,
        email,
        role: type.name.toLowerCase(),
        attributes,
      };
      createUser(createdUserObj)
        .then((res) => {
          showMessage(res.data.message)
          history.push("/user");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        {/* <ToastContainer position="bottom-right" /> */}
        <div>
          <h3 className={style.head}>Create New User</h3>
        </div>
        <div className={style.jumbotron}>
          <div className={style.container}>
            <form>
              <div className="form-group">
                <input
                  type="input"
                  className="form-control"
                  id="name"
                  placeholder="Full Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleFormInput}
                />
              </div>

              {this.state.nameError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.nameError}
                </div>
              ) : null}

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFormInput}
                />
              </div>

              {this.state.emailError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.emailError}
                </div>
              ) : null}

              <div className="form-group">
                <input
                  type="input"
                  className="form-control"
                  id="phnumber"
                  placeholder="Phone Number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleFormInput}
                />
              </div>

              {this.state.numberError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.numberError}
                </div>
              ) : null}

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleFormInput}
                />
              </div>

              {this.state.addressError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.addressError}
                </div>
              ) : null}

              <div className="form-row text-align-around">
                <div className="col">
                  <div className="form-group">
                    <Multiselect
                      className={style.multi}
                      singleSelect={true}
                      options={this.typeOptions} // Options to display in the dropdown
                      onSelect={this.onTypeSelect} // Function will trigger on select event
                      onRemove={this.onRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      className="form-control"
                      placeholder="Select Type"
                    />
                  </div>
                </div>

                {this.state.typeError ? (
                  <div
                    className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                    role="alert"
                  >
                    {this.state.typeError}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <Multiselect
                  className={style.multi}
                  singleSelect={true}
                  options={this.attributeOptions} // Options to display in the dropdown
                  onSelect={this.onAttributeSelect} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  className="form-control"
                  placeholder="Select Attribute"
                />
              </div>

              {this.state.attributeError ? (
                <div
                  className={`alert alert-warning alert-dismissible fade show  ${style.msg}`}
                  role="alert"
                >
                  {this.state.attributeError}
                </div>
              ) : null}

              <div className={style.mb}>
                <Button name="Create" onClick={this.mySubmitHandler} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

var actions = {
  showMessage
}

export default connect(null, actions)(CreateUser);
