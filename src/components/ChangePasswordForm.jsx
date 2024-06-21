import { useState, useEffect } from "react";
import "../styles/ChangePasswordForm.css"

const ChangePasswordForm = () => {
    const [userid, setUserID] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleUserID = (e) => {
        setUserID(e.target.value);
    }

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const changePassword = (event) => {
        event.preventDefault();

        const headers = { 'Content-Type': 'application/json' }
        fetch('http://localhost:3333/users/'+userid)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            this.setState({ totalReactPackages: data.total })
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            alert('There was an error!', error);
        });

        // if (password_history) {
        //     if(password_history.previous_password_4 != "")
        //         password_history.previous_password_5 = password_history.previous_password_4;
            
        //     if(password_history.previous_password_3 != "")
        //         password_history.previous_password_4 = password_history.previous_password_3;
            
        //     if(password_history.previous_password_2 != "")
        //         password_history.previous_password_3 = password_history.previous_password_2;
            
        //     if(password_history.previous_password_1 != "")
        //         password_history.previous_password_2 = password_history.previous_password_1;
            
        //     password_history.previous_password_1 = password_history?.current_password;

        //     await this.passwordsHistoryController.save(password_history);
        // }

        // Change this part. Passwords should be collected from database.
        const passwords = ["AA11!aaaaaaa", 
            "BB22@bbbbbbb", 
            "CC33#ccccccc", 
            "DD44$ddddddd", 
            "EE55%eeeeeee", 
            "FF66?fffffff", 
            "GG77&ggggggg", 
            "HH88*hhhhhhh",
            "II99(iiiiiii",
            "JJ00)jjjjjjj"
        ]
        if(userid == "" || userid.includes(" "))
            alert("UserID is invalid!");
        else if (currentPassword != "AA11!aaaaaaa")
            alert("Old password is incorrect!");
        else if (currentPassword == newPassword)
            alert("New password cannot be the same as old password!");
        else if (passwords.includes(newPassword))
            alert("New password must be different from the 10 previous passwords!");
        else if (newPassword != confirmPassword)
            alert("New password and confirmation do not match!");
        else if (newPassword.includes(" "))
            alert("New password must not contain empty spaces!");
        else if (newPassword.length < 12)
            alert("New password must be at least 12 characters long!");
        else {
            const specialCharacters = "[@_!$%^&*()<>?/\\|}{~:]#";
            var tempUpper = 0;
            var tempNumber = 0;
            var tempSpecial = 0;
            for (let i=0; i<newPassword.length; i++) {
                if (specialCharacters.includes(newPassword[i]))
                    tempSpecial++;
                else if (newPassword[i] >= "0" && newPassword[i] <= "9")
                    tempNumber++;
                else if (newPassword[i].toUpperCase() == newPassword[i])
                    tempUpper++;
            }
            if (tempUpper != 2)
                alert("Password should have exactly two uppercase characters!");
            else if (tempNumber != 2)
                alert("Password should have exactly two numbers!");
            else if (tempSpecial != 1)
                alert("Password should contain exactly one special character!");
            else
                alert("Password Changed!");
        }
    };
    return (
        <div> 
            <form onSubmit={changePassword}>
                <label>UserID: </label> <br></br>
                <input type="text" id="userid" name="userid" onChange={handleUserID} required /> <br></br> <br></br>

                <label>Old Password: </label> <br></br>
                <input type="password" id="currentPassword" name="currentPassword" onChange={handleCurrentPassword} required /> <br></br> <br></br>

                <label>New Password: </label> <br></br>
                <input type="password" id="newPassword" name="newPassword" onChange={handleNewPassword} required /><br></br> <br></br>

                <label >Confirm Password: </label> <br></br>
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleConfirmPassword} required /><br></br> <br></br>

                <button type="submit">Submit</button><br></br> <br></br>
            </form>
        </div>
    );
};

export default ChangePasswordForm;