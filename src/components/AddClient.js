import React from 'react'
import axios from 'axios'
import { port, url } from '../variables'

const AddClient = (props) => {

    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [note, setNote] = React.useState('')
    const [products, setProducts] = React.useState('')

    const onChangeFullName = (event) => {
        setFullName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    const onChangeNote = (event) => {
        setNote(event.target.value)
    }

    const onChangeProducts = (event) => {
        setProducts(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const client = {
            fullName: fullName,
            email: email,
            phone: phone,
            note: note,
            products: products
        }

        window.location = '/'

        //const url = `http://localhost:${port}/clients/add`
        //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

        axios.post(`http://${url}/clients/add`, client)
            .then(res => console.log(res.data))
    }

    return (
        <div>
            <h1>add a client</h1>
            <form className="add-new" onSubmit={onSubmit}>
                <input style={{ textTransform: 'capitalize' }} placeholder="Celé meno" onChange={onChangeFullName} value={fullName} type="text" autoFocus required />
                <input placeholder="@" onChange={onChangeEmail} value={email} type="text" />
                <input placeholder="Telefón" onChange={onChangePhone} value={phone} type="tel" />
                <input placeholder="Poznámka" onChange={onChangeNote} value={note} type="text" />
                <input placeholder="Finančné produkty" onChange={onChangeProducts} value={products} type="text" />
                <button style={{ fontWeight: "bold", 
                                backgroundColor: "#3b9ae1", 
                                marginTop: "2em", 
                                display: "inline-block" }} 
                        className="btn btn-primary" type="submit">add new client</button>
            </form>
        </div>
    )

}

export default AddClient