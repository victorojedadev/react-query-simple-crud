import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createProduct } from '../api/productsAPI'

function ProductsForm() {

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => { 
      queryClient.invalidateQueries('products')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true
    });

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input type="text" name='name' id='name' />

      <label htmlFor="descripcion">Descripcion</label>
      <input type="text" name='description' id='description' />

      <label htmlFor="precio">Precio</label>
      <input type="number" name='price' id='price' />

      <button>Agregar</button>
    </form>
  )
}

export default ProductsForm