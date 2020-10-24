export const parseUserFromRest = (receivedUser) => ({
    id: receivedUser.id,
    username: receivedUser.username,
    firstName: receivedUser.first_name,
    secondName: receivedUser.second_name,
    lastName: receivedUser.last_name,
    role: receivedUser.role,
    money: receivedUser.money,
    petId: receivedUser.pet_id,
    petRank: receivedUser.pet_rank,
    inventory: receivedUser.inventory,
})
