import React from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

const DeleteProduct = () => {
    let navigate = useNavigate()
    let { id } = useParams()

    const handleSave = (event) => {
        event.preventDefault()
        try {
            axios.put("http://localhost:3001/products/" + id, {
                price: formData.price,
                stock: formData.stock,
            })
        toast.success("Products updated successfully!")
        navigate('/')

        } catch (error) {
            console.log(error)
        }
      }
  return (
    <div>DeleteProduct</div>
  )
}

export default DeleteProduct