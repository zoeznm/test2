// lampHandlers.js
import { updateCoinCount } from './coinHandlers.js';
import { dragStart, setDropZoneEventListeners } from './dragDropHandlers.js';
import { createStars, setCloudAnimation, updateBinaryText } from './animations.js';
import { getRandomInt } from './helpers.js';    


export let activeLamp = null;
let styleElements = [];
const starLimit = 20;
const main = document.querySelector('main');
const initialContent = main.innerHTML;
const initialClassName = main.className;
let coinDisplay = document.getElementById('coin-display'); // 초기 참조

export function resetLampImages(lamps) {
    lamps.forEach(({ light }) => {
        const lightElement = document.querySelector(light);
        if (lightElement) {
            lightElement.style.display = 'none';
        }
    });
}


export function handleLampClick(lampData, lamps) {
    const { lamp, light, backgroundClass, additionalContent, backgroundImage, additionalScript, additionalCSS, additionalHTML, imgClass, imgSrc } = lampData;
    const lightElement = document.querySelector(light);

    console.log('Lamp clicked:', lampData);
    console.log('lightElement:', lightElement);
    console.log('imgClass:', imgClass, 'imgSrc:', imgSrc);

    resetLampImages(lamps);

    if (activeLamp === lamp) {
        lightElement.style.display = 'none';
        main.classList.remove(backgroundClass);
        main.style.backgroundImage = '';
        resetMainContent(lamps);
        activeLamp = null;
    } else {
        if (activeLamp) {
            const activeLampData = lamps.find(({ lamp }) => lamp === activeLamp);
            document.querySelector(activeLampData.light).style.display = 'none';
            resetMainContent(lamps);
        }

        lightElement.style.display = 'block';

        requestAnimationFrame(() => {
            if (backgroundClass) {
                main.classList.add(backgroundClass);
            }
            if (backgroundImage) {
                main.style.backgroundImage = backgroundImage;
            }

            if (additionalContent) {
                main.insertAdjacentHTML('beforeend', additionalContent);
            }
            if (additionalHTML) {
                main.insertAdjacentHTML('beforeend', additionalHTML);
            }
            if (additionalScript) {
                const scriptElement = document.createElement('script');
                scriptElement.innerHTML = additionalScript;
                document.body.appendChild(scriptElement);
            }
            if (additionalCSS) {
                const styleElement = document.createElement('style');
                styleElement.innerHTML = additionalCSS;
                document.head.appendChild(styleElement);
                styleElements.push(styleElement);
            }

            main.offsetHeight;

            activeLamp = lamp;

            if (backgroundClass === 'animal-scene') {
                setCloudAnimation();
            }

            if (backgroundClass === 'time-scene') {
                updateBinaryText();
            }

            if (backgroundClass === 'space-scene') {
                createStars();
            }

            if (imgClass && imgSrc) {
                console.log('Creating stars for:', imgClass);
                const starsContainer = document.getElementById('stars-container');
                starsContainer.innerHTML = '';
                starsContainer.style.opacity = 1;

                for (let i = 0; i < starLimit; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    const coinId = `coin-${imgClass}-${i}`;
                    star.innerHTML = `<img draggable="true" id="${coinId}" data-message="This is coin ${i} from ${imgClass}" class="${imgClass}" src="${imgSrc}" alt="">`;

                    const endY = getRandomInt(90, 70);
                    const endX = getRandomInt(10, 90);
                    const rotateAngle = getRandomInt(-90, 90);

                    star.style.transform = `translateY(${endY}vh) translateX(${endX}vw) rotate(${rotateAngle}deg)`;
                    star.style.transition = 'transform 5s ease-in-out';

                    star.querySelector('img').addEventListener('dragstart', dragStart);

                    starsContainer.appendChild(star);
                }
            }
            setDropZoneEventListeners();

            coinDisplay = document.getElementById('coin-display'); // coinDisplay 요소를 참조합니다.
            console.log('coinDisplay:', coinDisplay); // coinDisplay 참조 확인
            console.log('coinCount:', lampData.coinCount); // coinCount 값 확인
            updateCoinCount(lampData.coinCount); // coinCount 값을 업데이트합니다.
        });
    }
}


export function attachLampEventListeners(lamps) {
    lamps.forEach(lampData => {
        const lampElement = document.querySelector(lampData.lamp);
        lampElement.addEventListener('click', () => handleLampClick(lampData, lamps));
    });
}

export function resetMainContent(lamps, shouldResetBackground) {
    if (!main) {
        console.error('Main element not found');
        return;
    }

    main.className = initialClassName;
    main.innerHTML = initialContent;

    if (shouldResetBackground) {
        main.style.backgroundImage = '';
    }

    styleElements.forEach(styleElement => {
        if (styleElement.parentNode) {
            styleElement.parentNode.removeChild(styleElement);
        }
    });

    styleElements = [];

    if (typeof attachLampEventListeners === 'function') {
        attachLampEventListeners(lamps);
    } else {
        console.error('attachLampEventListeners function not found');
    }

    let coinDisplay = document.getElementById('coin-display');
    console.log('resetMainContent coinDisplay:', coinDisplay);

    if (coinDisplay) {
        if (activeLamp) {
            updateCoinCount(activeLamp.coinCount);
        } else {
            updateCoinCount(0);
        }
    } else {
        console.error('coin-display element not found');
    }
}