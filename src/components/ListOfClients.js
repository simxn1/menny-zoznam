import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { url } from '../variables'


const Client = (props) => {
    return (
        <li>
            <article>
                <div style={{ textTransform: "capitalize" }}>{props.client.fullName}</div>
                <a href={"mailto:" + props.client.email}>{props.client.email}</a>
                <a href={"tel:" + props.client.phone} className="phone" >{props.client.phone}</a>
                <span>{props.client.note}</span>
                <span>{props.client.products}</span>
                <Link to={"/update/" + props.client._id} className="edit"><i class="fas fa-user-edit"></i></Link>
            </article>

            <a style={{ textDecoration: 'none' }} className="ctrl" onClick={() => { props.deleteClient(props.client._id) }}>x</a>
        </li>
    )
}

const ListOfClients = (props) => {

    const [clients, setClients] = React.useState([])
    const [clientsLoaded, setClientsLoaded] = React.useState([])

    useEffect(() => {
        axios.get(`${url}/clients/`)
            .then(response => {
                setClients(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const deleteClient = (id) => {
        axios.delete(`${url}/clients/` + id)
            .then(res => console.log(res.data))
        setClients(clients.filter(client => client._id !== id))
    }

    const onChangeFind = (event) => {

        if (event.target.value.length) {
            let matcher = event.target.value
            let regex = new RegExp(matcher, "g")

            setClients(clients.filter(client => client.fullName.substring(0, event.target.value.length).match(regex)))
        }
        else {
            axios.get(`${url}/clients/`)
            .then(response => {
                setClients(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }

    }

    const onKeyFind = (event) => {
        if (event.key === "Backspace") {

            axios.get(`${url}/clients/`)
            .then(response => {
                setClientsLoaded(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

            if (event.target.value.length) {
                let matcher = event.target.value
                let regex = new RegExp(matcher, "g")
    
                setClients(clientsLoaded.filter(client => client.fullName.substring(0, event.target.value.length).match(regex)))
            }
            else {
                setClients(clientsLoaded)
            }
        }
    }

    return (
        <div>
            <form className="add-new find">
                <input placeholder="find client by name" onChange={onChangeFind} onKeyUp={onKeyFind} />
            </form>
            <ul className="list-of-clients">

                    {
                        clients.map(currentClient => {
                        return <Client clients={clients} client={currentClient} deleteClient={deleteClient} key={currentClient._id} />})
                    }

            </ul>
        </div>
    )


    /*(
        <ul className="listOfClients">
            <li>
                <article>
                    Tibor Munka
                    <a href="mailto:tm.munka@gmail.com">tm.munka@gmail.com</a>
                    <a href="tel:+421905204869" className="phone" >+421 905 204 869</a>
                    <span>oco.</span>
                    <span>Hypotéka, toto, tamto.</span>
                </article>

                <a style={{ textDecoration: 'none' }} href="#" className="ctrl">x</a>
            </li>
        </ul>

    )*/

}

export default ListOfClients