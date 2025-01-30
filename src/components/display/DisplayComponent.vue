<template>
  <div class="display-container">
    <div class="equation-container">
      <span v-if="lastEquation && isEquationFinished">{{ lastEquation }}</span>
    </div>
    <div class="user-numbers-container">
      <span v-show="isEquationFinished" class="equals-to"> = </span
      ><input
        readonly
        type="text"
        :value="equationActualValue"
        name="display"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "DisplayComponent",
  props: {
    lastEquation: {
      type: String,
      required: false,
    },
    equationActualValue: {
      type: String,
      default: "0",
      required: false,
    },
    isEquationFinished: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>
<style>
.display-container {
  height: 288px;
  margin-bottom: 0rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 3rem;
}

.equals-to {
  font-size: 40px;
  color: var(--secondary-font-color);
  margin-right: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 100;
  user-select: none;
}

.user-numbers-container {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.user-numbers-container input {
  width: 100%;
  height: 50px;
  background-color: var(--primary-bg-color);
  color: var(--main-font-color);
  font-size: 40px;
  text-align: right;
  border: none;
  outline: none;
  font-size: 36px;
  user-select: none;
  cursor: default;
  pointer-events: none;
}

.equation-container {
  color: var(--secondary-font-color);
  font-size: 20px;
  letter-spacing: -2%;
  line-height: 140%;
  align-self: flex-end;
  margin-bottom: 0.3rem;
  user-select: none;
  margin-right: 0.25rem;
}
</style>
