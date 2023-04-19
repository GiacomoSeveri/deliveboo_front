<script>
export default {
    name: 'AppMotion',
    data() {
        return {
            isVisible: true,
        }
    },
    methods: {
        animateLogo() {
            setTimeout(() => {
                this.isVisible = false;
            }, 6500);
        },
    },
    created() {
        this.animateLogo();
    }
}
</script>

<template>
    <div v-if=isVisible id="main-bg">
        <div class="p-absolute">
            <div class="mask-1"></div>
            <div class="mask-2"></div>
            <div class="mask-3"></div>
            <div class="mask-4"></div>
            <div class="mask-5"></div>
            <div class="mask-6"></div>
            <figure>
                <img class="ma" src="http://localhost:5174/src/assets/img/minore.png" alt="logo">
                <img class="mi" src="http://localhost:5174/src/assets/img/maggiore.png" alt="logo"><br>
                <img class="ti-left" src="http://localhost:5174/src/assets/img/tilde-sinistra.png" alt="logo">
                <img class="ti-right" src="http://localhost:5174/src/assets/img/tilde-destra.png" alt="logo"><br>
                <img class="ma-down" src="http://localhost:5174/src/assets/img/minore-basso-sinistro.png" alt="logo">
                <img class="mi-down" src="http://localhost:5174/src/assets/img/maggiore-basso-destro.png" alt="logo">
            </figure>
            <h1 class="deliveboo">DeliveBoo</h1>
            <h3 class="byte"><span class="bold">Byte</span> <span class="your">your</span> <span class="food">food</span>
            </h3>
        </div>
        <div class="mask-7"></div>
    </div>
</template>

<style lang="scss" scoped>
#main-bg {
    background-color: var(--d-orange);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    animation: main-bg 1s ease;
    animation-delay: 5s;
    animation-fill-mode: forwards;

    z-index: 7;

    // MASK---------------
    .mask-1 {
        background-color: var(--d-orange);
        width: 200px;
        height: 276px;

        position: absolute;
        top: -3px;
        left: -172px;

        z-index: 10;
    }

    .mask-2 {
        background-color: var(--d-orange);
        width: 200px;
        height: 276px;

        position: absolute;
        top: -3px;
        left: 232px;

        animation: mask-2 0.6s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        z-index: 10;
    }

    .mask-3 {
        background-color: var(--d-orange);
        width: 300px;
        height: 183px;

        position: absolute;
        top: -151px;
        left: -24px;

        z-index: 10;
    }

    .mask-4 {
        background-color: var(--d-orange);
        width: 300px;
        height: 176px;

        position: absolute;
        top: 232px;
        left: -24px;

        z-index: 10;
    }

    .mask-5 {
        background-color: var(--d-orange);
        width: 885px;
        height: 211px;

        position: absolute;
        top: 23px;
        left: -607px;

        z-index: 9;
    }

    .mask-6 {
        background-color: var(--d-orange);
        width: 885px;
        height: 211px;

        position: absolute;
        top: 23px;
        left: 271px;
        z-index: 8;
    }

    .mask-7 {
        background-color: var(--d-orange);
        width: 100%;
        height: 386px;

        position: fixed;
        top: 594px;
        left: 0px;

        z-index: 13;
    }

    //--------------------
    .p-absolute {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-183%, 20%);

        animation: ending-motion 1s ease;
        animation-delay: 4s;
        animation-fill-mode: forwards;
    }

    h1 {
        font-size: 11rem;
        color: white;
        position: absolute;
        left: -614px;
        top: 20px;

        animation: deliveboo 1s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        z-index: 8;
    }

    h3 {
        font-family: "Jost", sans-serif;
        color: white;
        position: absolute;
        font-weight: lighter;
    }

    .byte {
        top: 225px;
        left: 91%;
        width: 2000px;
        font-size: 72px;
    }

    .bold {
        opacity: 0;
        font-weight: 700;
        letter-spacing: 9px;

        animation: byte 1.5s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
    }

    .your {
        opacity: 0;
        animation: byte 1.5s ease;
        animation-delay: 1s;
        animation-fill-mode: forwards;
    }

    .food {
        opacity: 0;
        animation: byte 1.5s ease;
        animation-delay: 1.5s;
        animation-fill-mode: forwards;
    }


    img {
        width: 150px;
        // position: absolute;
    }

    figure {
        position: relative;
        width: 300px;
        margin: 0;
    }

    .ma,
    .mi,
    .ti-left,
    .ti-right,
    .ma-down,
    .mi-down {
        position: absolute;

        z-index: 9;
    }

    .ma,
    .mi {
        transform: translateY(-100%);
        animation: dropping 0.8s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        z-index: 9;
    }

    .mi {
        right: 40px;

        z-index: 9;
    }

    .ti-left {
        top: 70px;
        transform: translateX(-100%);

        animation: goingRight 1s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        z-index: 9;
    }

    .ti-right {
        top: 70px;
        right: 40px;
        transform: translateX(100%);

        animation: goingLeft 1s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        z-index: 9;
    }

    .ma-down,
    .mi-down {
        transform: translateY(100%);

        animation: goingUp 1s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;

        z-index: 9;
    }

    .ma-down {
        top: 125px;

        z-index: 9;
    }

    .mi-down {
        top: 125px;
        right: 40px;

        z-index: 9;
    }

    .taste {
        animation: taste 2s ease;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
    }
}

// animation
@keyframes deliveboo {
    0% {
        left: -614px;
        filter: blur(5px);
    }

    100% {
        left: 265px;
        filter: blur(0);
    }
}

@keyframes taste {
    0% {
        transform: translateY(-232%);
    }

    100% {
        transform: translateY(0);
    }

}

@keyframes byte {
    0% {
        opacity: 0%;
    }

    80% {
        opacity: 0%;
    }

    100% {
        opacity: 100%;
    }

}

@keyframes dropping {
    0% {
        transform: translateY(-100%);
        filter: blur(5px);
    }


    100% {
        transform: translateY(0);
        filter: blur(0);
    }

}

@keyframes goingUp {
    0% {
        transform: translateY(100%);
        filter: blur(5px);
    }


    100% {
        transform: translateY(0);
        filter: blur(0);
    }
}

@keyframes goingRight {
    0% {
        transform: translateX(-100%);
        filter: blur(5px);
    }

    100% {
        transform: translateX(0);
        filter: (0);
    }
}

@keyframes goingLeft {
    0% {
        transform: translateX(100%);
        filter: blur(5px);
    }


    100% {
        transform: translateX(0);
        filter: blur(0);
    }
}

@keyframes mask-2 {
    0% {
        width: 200px;
    }

    100% {
        width: 46px;
    }
}

@keyframes ending-motion {
    0% {
        transform: translate(-183%, 20%);
        filter: blur(5px);
    }

    100% {
        transform: translate(-183%, 850%);
    }
}

@keyframes main-bg {
    0% {
        opacity: 100%;
    }

    100% {
        opacity: 0%;
    }
}
</style>