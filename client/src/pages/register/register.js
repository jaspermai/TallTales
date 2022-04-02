import React from "react";
import AppName from "../../components/appName/appName.js";
import UserLoginInput from "../../components/userLoginInput/userLoginInput.js";
import TextButton from "../../components/textButton/textButton.js";

import { addUser } from "../../actions/register/addUser.js";

import "./register.css";

class Register extends React.Component {

    render() {    
        const handleClick = () => {
            addUser(this.props.app, this.props.app.state.users);
        }

        return (
            <div className="register-page">
                <div className="register-header">
                    <AppName showTagline></AppName>
                </div>
                <UserLoginInput text="REGISTER" enterFunction={handleClick}></UserLoginInput>
                <TextButton text="<CONFIRM REGISTRATION>" handleClick={handleClick}/>
                
            </div>
        );
    }
}

export default Register;