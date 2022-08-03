import React from 'react'

const Filter = ({newSearch, onChangeSearch}) => {

  return (
    <>
      Search: <input type="text" value={newSearch} placeholder={'Write a name'} onChange={onChangeSearch} />
    </>
  )
}

export default Filter;