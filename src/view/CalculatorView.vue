<template>
    <main class="wrapper animate__animated animate__zoomIn">
        <div class="display">

        </div>
        <div class="button-container">
            <div class="button-row" v-for="(ButtonRow, index) in buttonMapping" :key="index">
                <ButtonComponent v-for="(buttonValue, index) in ButtonRow" :key="index + buttonValue"
                    :value="buttonValue" />
            </div>
        </div>
    </main>
</template>
<script>
import ButtonComponent from "../components/button/ButtonComponent.vue";

export default {
    name: "CalculatorView",
    props: {
        buttonMapping: {
            type: Array,
            required: true,
        },
    },
    components: {
        ButtonComponent,
    },
};
</script>
<style scoped>
.wrapper {
    display: flex;
    width: 356px;
    height: 566px;
    border-radius: 48px;
    flex-direction: column;
    gap: 26px;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-color);
    margin: 2rem;
    transition: transform 0.2s ease-in-out;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.26), 0px 0px 2px rgba(0, 0, 0, 0.29), inset 0px 1px 3px rgba(255, 255, 255, 0.15), 0px 11px 7px rgba(0, 0, 0, 0.01), 0px 7px 7px rgba(0, 0, 0, 0.04);
}

.display {
    height: 288px;
}

.button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 2rem;
}

.button-row {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 12px;
    margin-bottom: 12px;
}

.button-row:last-child {
    margin-bottom: 0;
}

.animate__animated {
    --animate-duration: 2s;
    /* Set the desired duration here */
}
</style>
