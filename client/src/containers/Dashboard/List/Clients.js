import React, {Component} from 'react';

import authentication from '../../../utils/auth';


class Clients extends Component {

    state = {
        clients: [],
        error: false
    }
    componentDidMount() {
        fetch('http://localhost:4000/user/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + authentication.getToken()
            }
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ clients: data.clients })
        })
        .catch((error) => {
            this.setState({ error: true })
        });
    }
    render() {

        let map =  (
            <div>
                <p>There are not elements</p>
            </div>
        );

        if (this.state.error !== true && this.state.clients !== undefined) {
            map = this.state.clients.map((client) => (
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Id: {client.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Name: {client.name}</h6>
                        <p className="card-text">Email: {client.email}</p>
                        <p className="card-text">Role: {client.role}</p>
                        </div>
                    </div>
                ))
        } 

        return (
            <div className="list">
                <center><h1> Clients List</h1></center>
                {map}
            </div>
        );
    }
}

export default Clients;