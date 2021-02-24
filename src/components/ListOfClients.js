import React, { useState, useEffect } from 'react'
import { Link, StaticRouter } from 'react-router-dom'
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

    const [clientsDisplayed, setClientsDisplayed] = React.useState([])
    const [clientsLoaded, setClientsLoaded] = React.useState([])
    const [findChecked, setFindChecked] = React.useState(false)
    const [findPlaceholder, setFindPlaceholder] = React.useState('find client by name')

    useEffect(() => {
        loadAndSetClientsDisplayed()
    }, [])

    const loadAndSetClientsDisplayed = () => {
        axios.get(`${url}/clients/`)
            .then(response => {
                setClientsDisplayed(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadAndSetClientsLoaded = () => {
        axios.get(`${url}/clients/`)
            .then(response => {
                setClientsLoaded(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteClient = (id) => {
        axios.delete(`${url}/clients/` + id)
            .then(res => console.log(res.data))
        setClientsDisplayed(clientsDisplayed.filter(client => client._id !== id))
    }

    const onChangeFind = (event) => {
        
        if (!findChecked) {

            if (event.target.value.length) {
                let matcher = event.target.value
                let regex = new RegExp(matcher, "g")

                setClientsDisplayed(clientsDisplayed.filter(client => client.fullName.substring(0, event.target.value.length).match(regex)))
            }
            else {
                loadAndSetClientsDisplayed()
            }

        }
        else {

            if (event.target.value.length) {
                let matcher = event.target.value
                let regex = new RegExp(matcher, "g")

                setClientsDisplayed(clientsDisplayed.filter(client => client.note.substring(0, event.target.value.length).match(regex)))
            }
            else {
                loadAndSetClientsDisplayed()
            }

        }
    
    }

    const onKeyFind = (event) => {
        
        if (!findChecked) {

            if (event.key === "Backspace") {

                loadAndSetClientsLoaded()

                if (event.target.value.length) {
                    let matcher = event.target.value
                    let regex = new RegExp(matcher, "g")
                    
                    setClientsDisplayed(clientsLoaded.filter(client => client.fullName.substring(0, event.target.value.length).match(regex)))
                }
                else {
                    setClientsDisplayed(clientsLoaded)
                }

            }
        }
        else {

            if (event.key === "Backspace") {

                loadAndSetClientsLoaded()

                if (event.target.value.length) {
                    let matcher = event.target.value
                    let regex = new RegExp(matcher, "g")

                    setClientsDisplayed(clientsLoaded.filter(client => client.note.substring(0, event.target.value.length).match(regex)))
                }
                else {
                    setClientsDisplayed(clientsLoaded)
                }
            }

        }
    }

    const onChangeCheck = (event) => {
        setFindChecked(event.target.checked)

        const inputFind = document.getElementById('find-client')
        
        if (event.target.checked) {
            setFindPlaceholder('find client by type')
            loadAndSetClientsLoaded()

            if (inputFind.value.length) {
                let matcher = inputFind.value
                let regex = new RegExp(matcher, "g")

                setClientsDisplayed(clientsLoaded.filter(client => client.note.substring(0, inputFind.value.length).match(regex)))
            }
        }
        else {
            setFindPlaceholder('find client by name')
            loadAndSetClientsLoaded()

            if (inputFind.value.length) {
                let matcher = inputFind.value
                let regex = new RegExp(matcher, "g")

                setClientsDisplayed(clientsLoaded.filter(client => client.fullName.substring(0, inputFind.value.length).match(regex)))
            }
        }
    }

    return (
        <div>
            <form className="add-new find">
                <input id="find-client" placeholder={findPlaceholder} onChange={onChangeFind} onKeyUp={onKeyFind} autoFocus />
                <input type="checkbox" id="switch" onChange={onChangeCheck} /><label for="switch">Toggle</label>
            </form>
            <span>total number of clients:&nbsp;<strong>{clientsDisplayed.length}</strong></span>
            <ul className="list-of-clients">

                    {
                        clientsDisplayed.map(currentClient => {
                        return <Client clients={clientsDisplayed} client={currentClient} deleteClient={deleteClient} key={currentClient._id} />})
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