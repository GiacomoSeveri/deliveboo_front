<script>
export default {
    name: 'CartPage',
    data() {
        return {}
    },
    methods: {

    }
}
</script>

<template>
    <div class="container mt-5">
        <h1>Il tuo carrello</h1>
        <div class="card mt-4">
            <h4 class="custom-p m-0">I tuoi ordini da Nome ristorante</h4>
            <table class="table table-hover m-0">
                <thead>
                    <tr>
                        <th class="custom-p" scope="col">Piatto</th>
                        <th class="custom-p" scope="col">Quantità</th>
                        <th class="custom-p" scope="col">Prezzo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="a in b">
                        <td class="custom-p">{{ a.name }}</td>
                        <td class="custom-p">{{ a.amount }}</td>
                        <td class="custom-p">{{ a.price }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="custom-p">
                Non hai ancora effettuato ordini
            </div>
            <div class="custom-p d-flex justify-content-between align-items-center">
                <span>
                    Prezzo Totale: prezzo totale
                </span>
                <form action="">
                    <button class="btn btn-custom-secondary">Conferma Ordine</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: var(--d-blue);
}

.custom-p {
    padding: 10px 20px;
}
</style>