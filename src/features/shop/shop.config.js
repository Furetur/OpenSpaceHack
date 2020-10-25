import img0 from './img/0.png'
import img1 from './img/1.png'

export const ItemType = {
    HAT: 'hat',
}

export const itemTypesToUserPropertyNames = {
    [ItemType.HAT]: 'petHat',
}

const shopConfig = {
    0: {
        name: 'Item 1',
        type: ItemType.HAT,
        img: img0,
        price: 10,
    },
    1: {
        name: 'Item 2',
        type: ItemType.HAT,
        img: img1,
        price: 20,
    },
}

export default shopConfig
