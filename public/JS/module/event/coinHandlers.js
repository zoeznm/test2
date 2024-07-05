// coinHandlers.js
export function updateCoinCount(amount) {
    const coinDisplay = document.getElementById('coin-display'); // coinDisplay 요소 참조
    console.log('updateCoinCount coinDisplay:', coinDisplay); // coinDisplay 참조 확인
    console.log('updateCoinCount amount:', amount); // amount 값 확인
    if (coinDisplay) {
        coinDisplay.textContent = `${amount || 0} COIN`; // amount가 undefined일 경우 0으로 설정
    } else {
        console.error('coinDisplay element not found');
    }
    updateActiveProducts(amount || 0); // amount가 undefined일 경우 0으로 설정
}

function updateActiveProducts(coinCount) {
    const products = document.querySelectorAll('.can');
    products.forEach((product, index) => {
        const label = product.querySelector('.label');
        if (index < coinCount) {
            product.classList.add('active');
            label.style.color = 'red';
        } else {
            product.classList.remove('active');
            label.style.color = '';
        }
    });
}
