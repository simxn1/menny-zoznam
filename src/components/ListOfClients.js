import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import port from '../port-variable'


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
    const [findChecked, setFindChecked] = React.useState(false)
    const [findPlaceholder, setFindPlaceholder] = React.useState('find client by name')

    useEffect(() => {
        axios.get(`http://localhost:${port}/clients/`)
            .then(response => {
                setClients(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const deleteClient = (id) => {
        axios.delete(`http://localhost:${port}/clients/` + id)
            .then(res => console.log(res.data))
        setClients(clients.filter(client => client._id !== id))
    }

    const onChangeFind = (event) => {

        //console.log(findChecked);

        if (!findChecked) {

            if (event.target.value.length) {
                let matcher = event.target.value
                let regex = new RegExp(matcher, "g")

                setClients(clients.filter(client => client.fullName.substring(0, event.target.value.length).match(regex)))
            }
            else {
                axios.get(`http://localhost:${port}/clients/`)
                    .then(response => {
                        setClients(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

        }
        else {

            if (event.target.value.length) {
                let matcher = event.target.value
                let regex = new RegExp(matcher, "g")

                setClients(clients.filter(client => client.note.substring(0, event.target.value.length).match(regex)))
            }
            else {
                axios.get(`http://localhost:${port}/clients/`)
                    .then(response => {
                        setClients(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

        } 

    }

    const onKeyFind = (event) => {

        if (!findChecked) {

            if (event.key === "Backspace") {

                axios.get(`http://localhost:${port}/clients/`)
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
        else {
            
            if (event.key === "Backspace") {

                axios.get(`http://localhost:${port}/clients/`)
                    .then(response => {
                        setClientsLoaded(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
    
                if (event.target.value.length) {
                    let matcher = event.target.value
                    let regex = new RegExp(matcher, "g")
    
                    setClients(clientsLoaded.filter(client => client.note.substring(0, event.target.value.length).match(regex)))
                }
                else {
                    setClients(clientsLoaded)
                }
            }

        }

    
    }

    const onChangeCheck = (event) => {
        setFindChecked(event.target.checked)

        if (event.target.checked) {
            setFindPlaceholder('find client by type')
        }
        else {
            setFindPlaceholder('find client by name')
        }
    }

    return (
        <div>
            <form className="add-new find">
                <input placeholder={findPlaceholder} onChange={onChangeFind} onKeyUp={onKeyFind} />
                <input type="checkbox" id="switch" onChange={onChangeCheck} /><label for="switch">Toggle</label>
            </form>
            <span>total number of clients:&nbsp;<strong>{clients.length}</strong></span>
            {/*<span>is checked ? {findChecked.toString()}</span>*/}
            <ul className="list-of-clients">

                {
                    clients.map(currentClient => {
                        return <Client clients={clients} client={currentClient} deleteClient={deleteClient} key={currentClient._id} />
                    })
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