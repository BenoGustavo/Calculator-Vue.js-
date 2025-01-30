<template>
    <button class="button-component" @click="emitButtonEvent(value)"
        :class="{ 'special-button': isSpecialButton(value), 'ce-button': value === 'CE' }">
        {{ value }}
    </button>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            specialButtons: ["÷", "×", "-", "+", "="],
        }
    },
    methods: {
        isSpecialButton(value) {
            return this.specialButtons.includes(value);
        },
        emitButtonEvent(value) {
            this.$emit("button-click", value);
        }
    },
}
</script>
<style scoped>
.button-component {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    text-align: center;
    font-size: 1.5rem;

    outline: none;
    border: none;

    color: var(--main-font-color);
    background-color: var(--bg-color);
    transition: filter 0.2s ease-in-out;

    user-select: none;
    cursor: pointer;

    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.26), 0px 0px 2px rgba(0, 0, 0, 0.29), inset 0px 1px 3px rgba(255, 255, 255, 0.15), 0px 11px 7px rgba(0, 0, 0, 0.01), 0px 7px 7px rgba(0, 0, 0, 0.04);
}

.button-component:hover {
    filter: brightness(1.1);
}

.button-component:active {
    filter: brightness(0.9);
}

.ce-button {
    color: var(--ce-button-color);
}

.special-button {
    background-color: var(--button-secundary-color);
}
</style>