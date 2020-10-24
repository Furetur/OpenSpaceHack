export const main = (myHatImg) => {
    const tamagochiClothes = document.querySelector('.tamagochi-clothes')
    tamagochiClothes.innerHTML = ''
    if (myHatImg != null) {
        const hatImgTag = document.createElement('img')
        hatImgTag.src = myHatImg
        tamagochiClothes.appendChild(hatImgTag)
    }
}
