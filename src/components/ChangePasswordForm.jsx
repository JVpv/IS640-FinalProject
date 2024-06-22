import { useState } from "react";
import "../styles/ChangePasswordForm.css"
import { CONSTANTS, JSHash } from "react-native-hash";

const ChangePasswordForm = () => {
    const baseUrl = 'http://localhost:3333/';
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

    const changePassword = async (event) => {
        event.preventDefault();

        const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

        const currentPasswordHashed = await JSHash(currentPassword, hashAlgorithm)
        const newPasswordHashed = await JSHash(newPassword, hashAlgorithm)

        fetch(baseUrl+'users/'+userid)
        .then(res => res.json())
        .then(user => {
            fetch(baseUrl+'passwords/'+user['id'])
            .then(res => res.json())
            .then(passwordHistory => {
                const passwords = [
                    passwordHistory['current_password'],
                    passwordHistory['previous_password_1'],
                    passwordHistory['previous_password_2'],
                    passwordHistory['previous_password_3'],
                    passwordHistory['previous_password_4'],
                    passwordHistory['previous_password_5'],
                ];
                if(userid == "" || userid.includes(" "))
                    alert("UserID is invalid!");
                else if (currentPasswordHashed != passwords[0])
                    alert("Old password is incorrect!");
                else if (currentPassword == newPassword)
                    alert("New password cannot be the same as old password!");
                else if (passwords.includes(newPasswordHashed))
                    alert("New password must be different from the 5 previous passwords!");
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
                    else {
                        alert("Password Changed!");
                        
                        passwords[5] = passwords[4];
                        passwords[4] = passwords[3];
                        passwords[3] = passwords[2];
                        passwords[2] = passwords[1];
                        passwords[1] = passwords[0];
                        passwords[0] = newPasswordHashed;

                        const options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: passwordHistory['id'],
                                user_id: passwordHistory['user_id'],
                                current_password: passwords[0],
                                previous_password_1: passwords[1],
                                previous_password_2: passwords[2],
                                previous_password_3: passwords[3],
                                previous_password_4: passwords[4],
                                previous_password_5: passwords[5]
                            })
                        }

                        fetch(baseUrl+'passwords', options)
                        .then(res => res.json)
                        .then(() => {
                            fetch(baseUrl+'users', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: user['id'],
                                    email: user['email'],
                                    password: passwords[0]
                                })
                            })
                        })
                        .catch(error => alert(error));
                    }
                }
            })
            .catch(error => alert(error));
        })
        .catch(error => alert(error));


        // if (password_history) {
        //     
        // }

        // Change this part. Passwords should be collected from database.
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