import React from 'react';
import {Alert} from '../Partials/Alert';
import Axios from 'axios';

export class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            success: '',
        }
    }
}