import React from 'react';
import Light from '../Switch/Light';
import Switch from '../Switch/Switch';

const SwitchBox = () => {
    return (
        <div className="col-md-6 mt-4">
            <div className="card text-center">
                <div className="card-header">
                    <h4>ATKHouse - Switch Box</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <Light/>
                        <Switch/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwitchBox;