import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getProducts, deleteProduct, updateProduct } from '../api/productsAPI'


function Products() {
  const { isLoading, data: products, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id)
  });

  const queryClient = useQueryClient();

  const deleteProducMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })

  const updateProducMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })


  if (isLoading) {
    return <div>Cargando...</div>
  } else if (isError) {
    return <div>Error: {error.message}</div>
  }
  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => {
        deleteProducMutation.mutate(product.id)
      }}>
        Eliminar
      </button>
      <input type="checkbox" 
        checked={product.inStock} 
        id={product.id}
        onChange={e => {
        updateProducMutation.mutate({
          ...product,
          inStock: e.target.checked
        })
      }} />
      <label htmlFor="">En Stock</label>
    </div>
  ));
}

export default Products