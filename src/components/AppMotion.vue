<script></script>

<template>
    <div id="main-bg">
        <div class="p-absolute">
            <figure>
                <img class="ma" src="http://localhost:5174/src/assets/img/minore.png" alt="logo">
                <img class="mi" src="http://localhost:5174/src/assets/img/maggiore.png" alt="logo"><br>
                <img class="ti-left" src="http://localhost:5174/src/assets/img/tilde-sinistra.png" alt="logo">
                <img class="ti-right" src="http://localhost:5174/src/assets/img/tilde-destra.png" alt="logo"><br>
                <img class="ma-down" src="http://localhost:5174/src/assets/img/minore-basso-sinistro.png" alt="logo">
                <img class="mi-down" src="http://localhost:5174/src/assets/img/maggiore-basso-destro.png" alt="logo">
            </figure>
            <h1>Deliveboo</h1>
            <h3 class="taste">Taste your favouirite food</h3>
            <h3 class="byte">1 <i>byte</i> at time.</h3>
        </div>
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
    z-index: 3;

    .p-absolute {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-183%, 20%);
    }

    h1 {
        font-size: 11rem;
        color: white;
        position: absolute;
        left: 265px;
        top: 20px;

        animation: deliveboo 1s;
    }

    h3 {
        color: white;
        position: absolute;
        top: 243px;
        left: 10%;
        width: 2000px;
        font-size: 90px;
        font-weight: 300;
    }

    .byte {
        top: 345px;
        left: 10%;
        width: 2000px;
        font-size: 90px;
        font-weight: 300;

        animation: byte 3s;
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
    }

    .mi {
        right: 40px;
    }

    .ti-left {
        top: 70px;
    }

    .ti-right {
        top: 70px;
        right: 40px;
    }

    .ma-down {
        top: 125px;

    }

    .mi-down {
        top: 125px;
        right: 40px;
    }

    .taste {
        animation: taste 2s;
    }
}

// animation
@keyframes deliveboo {
    0% {
        transform: translateX(-104%);
    }

    100% {
        transform: translateX(0);
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
</style>