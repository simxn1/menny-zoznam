import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EditClient = (props) => {

    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [note, setNote] = React.useState('')
    const [products, setProducts] = React.useState('')

    React.useEffect(() => {
        axios.get('http://localhost:5000/clients/' + props.match.params.id)
            .then(response => {
                setFullName(response.data.fullName)
                setEmail(response.data.email)
                setPhone(response.data.phone)
                setNote(response.data.note)
                setProducts(response.data.products)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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

    const onSubmit = () => {

        const client = {
            fullName: fullName,
            email: email,
            phone: phone,
            note: note,
            products: products
        }

        const url = 'http://localhost:5000/clients/update/' + props.match.params.id
        //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

        console.log(props.match.params.id)

        axios.post(url, client)
            .then(res => console.log(res.data))

        window.location = '/'
    }

    return (
        <div>
            <h1>update client's information</h1>
            <form className="add-new" onSubmit={onSubmit}>
                <input style={{ textTransform: 'capitalize' }} onChange={onChangeFullName} value={fullName} type="text" autoFocus required />
                <input onChange={onChangeEmail} value={email} type="text" />
                <input onChange={onChangePhone} value={phone} type="tel" />
                <input onChange={onChangeNote} value={note} type="text" />
                <input onChange={onChangeProducts} value={products} type="text" />
                <button style={{ fontWeight: "bold", 
                                backgroundColor: "#3b9ae1", 
                                marginTop: "2em", 
                                display: "inline-block" }} 
                                className="btn btn-primary" type="submit">update</button>
                {/*<Link to="/" style={{ fontWeight: "bold", 
                                backgroundColor: "#3b9ae1", 
                                marginTop: "2em", 
                                display: "inline-block" }} 
                                className="btn btn-primary" onClick={onSubmit}>update</Link>*/}
            </form>
        </div>
    )

}

export default EditClient