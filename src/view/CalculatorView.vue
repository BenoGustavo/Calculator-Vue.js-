<template>
  <main class="wrapper animate__animated animate__zoomIn">
    <DisplayComponent
      :is-equation-finished="isEquationFinished"
      :equation-actual-value="equationActualValue"
      :lastEquation="lastEquation"
    />
    <div class="button-container">
      <div
        class="button-row"
        v-for="(ButtonRow, index) in buttonMapping"
        :key="index"
      >
        <ButtonComponent
          @button-click="addToDisplay"
          v-for="(buttonValue, index) in ButtonRow"
          :key="index + buttonValue"
          :value="buttonValue"
        />
      </div>
    </div>
  </main>
</template>
<script>
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import DisplayComponent from "@/components/display/DisplayComponent.vue";
import Validator from "@/validation/equationValidator";

export default {
  name: "CalculatorView",
  props: {
    buttonMapping: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lastEquation: "",
      equationActualValue: "0",
      isEquationFinished: false,
      operators: ["÷", "×", "-", "+", "="],
    };
  },
  methods: {
    reset() {
      this.lastEquation = "";
      this.equationActualValue = "0";
      this.isEquationFinished = false;
    },

    evaluateEquation() {
      this.lastEquation = this.equationActualValue;
      this.equationActualValue = this.equationActualValue
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

      let result = eval(this.equationActualValue);
      if (result % 1 === 0) {
        this.equationActualValue = result.toString();
      } else {
        this.equationActualValue = result.toFixed(2).replace(/\.00$/, "");
      }
      this.isEquationFinished = true;
    },

    addToDisplay(value) {
      // console.log("Essa equação é válida? " + Validator.isValidEquation(this.equationActualValue) +
      //"\n" + "O valor atual é: " + this.equationActualValue + "\n" + "O valor que foi clicado é: " + value);

      if (
        Validator.isEqualsPressed(value) &&
        Validator.isValidEquation(this.equationActualValue)
      ) {
        // console.log("Equação é valida e o botão de igual foi apertado: " + this.equationActualValue);
        this.evaluateEquation();
        return;
      }

      if (Validator.isClearAllPressed(value)) {
        // console.log("O botão de clear foi apertado portanto a calculadora foi resetada");
        this.reset();
        return;
      }

      if (Validator.isClearPressed(value)) {
        // console.log("O botão de deletar foi apertado o ultimo digito do display foi deletado");
        this.equationActualValue = this.equationActualValue.slice(0, -1);

        if (this.equationActualValue === "") {
          this.reset();
          this.equationActualValue = "0";
        }
        return;
      }

      if (value === "." && Validator.isDisplayEmpty(this.equationActualValue)) {
        // console.log("O display estava vazio e o usuario tentou colocar um ponto portanto o valor foi adicionado: " + value);
        this.equationActualValue = "0" + value;
        return;
      }

      if (
        Validator.isDisplayEmpty(this.equationActualValue) &&
        Validator.isValidNumber(value)
      ) {
        // console.log("O display estava vazio portanto o valor foi adicionado: " + value);
        this.equationActualValue = value;
        return;
      }

      if (Validator.isValidNumber(value)) {
        // console.log("O valor é um número válido portanto foi adicionado: " + value);
        this.equationActualValue += value;
        return;
      }

      if (
        Validator.isEquationInverterPressed(value) &&
        !Validator.isDisplayEmpty(this.equationActualValue) &&
        !Validator.doesEquationContainOperator(
          this.equationActualValue,
          this.operators
        )
      ) {
        // console.log("O botão de inverter sinal foi apertado portanto o sinal do display foi invertido");

        // console.log(this.equationActualValue);
        this.equationActualValue = (this.equationActualValue * -1).toString();
        // console.log(this.equationActualValue);
        return;
      }

      if (
        Validator.isEquationInverterPressed(value) &&
        !Validator.isDisplayEmpty(this.equationActualValue)
      ) {
        let valueAfterOperator = this.equationActualValue
          .split(/[-+×÷]/)
          .slice(-1)[0];

        // console.log("O valor após o operador é: " + valueAfterOperator);

        if (valueAfterOperator === "") {
          let lastChar = this.equationActualValue.slice(-1);
          if (lastChar === "+") {
            this.equationActualValue =
              this.equationActualValue.slice(0, -1) + "-";
          } else if (lastChar === "×" || lastChar === "÷") {
            this.equationActualValue += "-";
          } else if (lastChar === "-") {
            this.equationActualValue =
              this.equationActualValue.slice(0, -1) + "+";
          }
          // console.log("O botão de inverter sinal foi apertado e o valor após o operador é vazio portanto o sinal do display foi invertido");
          return;
        }

        let lastChar = this.equationActualValue.slice(-1);
        let firstChar = this.equationActualValue.slice(0, 1);
        if (["-", "+", "×", "÷"].includes(lastChar)) {
          // console.log("O botão de inverter sinal foi apertado e o valor após o operador é um número portanto o sinal do display foi invertido");
          this.equationActualValue =
            this.equationActualValue.slice(0, -1) +
            (lastChar === "-" ? "+" : "-");
        } else if (["-", "+", "×", "÷"].includes(firstChar)) {
          // console.log("O botão de inverter sinal foi apertado e o valor após o operador é um número portanto o sinal do display foi invertido 1");
          this.equationActualValue =
            (firstChar === "-" ? "+" : "-") + this.equationActualValue.slice(1);
        } else {
          // console.log("O botão de inverter sinal foi apertado e o valor após o operador é um número portanto o sinal do display foi invertido 2");
          let lastNumber = parseFloat(valueAfterOperator);
          if (isNaN(lastNumber)) {
            return;
          }
          let invertedNumber = (lastNumber * -1).toString();
          this.equationActualValue =
            this.equationActualValue.slice(0, -valueAfterOperator.length) +
            invertedNumber;
        }
        return;
      }

      if (
        !Validator.isLastCharOperator(
          this.equationActualValue,
          this.operators
        ) &&
        !Validator.isDisplayEmpty(this.equationActualValue)
      ) {
        // console.log("O ultimo caractere não é um operador portanto o valor foi adicionado: " + value);
        this.equationActualValue += value;
        return;
      }
    },
  },
  components: {
    ButtonComponent,
    DisplayComponent,
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
  align-items: center;
  background-color: var(--bg-color);
  margin: 2rem;
  margin-top: 0rem;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.26),
    0px 0px 2px rgba(0, 0, 0, 0.29), inset 0px 1px 3px rgba(255, 255, 255, 0.15),
    0px 11px 7px rgba(0, 0, 0, 0.01), 0px 7px 7px rgba(0, 0, 0, 0.04);
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2rem;
  margin-top: 0rem;
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
