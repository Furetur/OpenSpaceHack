import React from 'react'
import { useSelector } from 'react-redux'
import { selectMyInventory } from '../../../users/users.slice'
import InventoryItem from '../InventoryItem/InventoryItem'

const Inventory = () => {
    const inventory = useSelector(selectMyInventory)

    return (
        <div>
            {inventory.map((id, index) => (
                <InventoryItem key={index} id={id} />
            ))}
        </div>
    )
}

export default Inventory
