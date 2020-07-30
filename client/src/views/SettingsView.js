import React from 'react'

const SettingsView = (props) => {
    return (
        <div>
            <h1>{localStorage.getItem('EMAIL')}</h1>
            <label>Old Password</label>
            <input></input>
            <label>New Password</label>
            <input></input>
        </div>
    )
}

export default SettingsView