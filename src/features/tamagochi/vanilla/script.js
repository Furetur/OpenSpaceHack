export const main = (myHatImg) => {
    const tamagochiClothes = document.querySelector('.tamagochi-clothes')
    // Важно очищать все что раньше добавил иначе одна шапка добавится 100 раз
    tamagochiClothes.innerHTML = ''
    if (myHatImg != null) {
        const hatImgTag = document.createElement('img')
        hatImgTag.src = myHatImg
        tamagochiClothes.appendChild(hatImgTag)
    }
}
