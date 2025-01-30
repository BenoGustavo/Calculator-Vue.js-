# Calculator

This is a simple calculator application built with Vue.js. The design for this calculator was inspired by a Figma design, which can be found [here](<https://www.figma.com/design/JvP7lLV3uAdBEOIsWlyU3I/Calculadora-%E2%80%A2-Desafio-05-(Community)?node-id=0-1&p=f&t=BrmY3ULgH4Ebwnln-0>).

## Project setup

To set up the project, run:

```sh
yarn install
```

### Compiles and hot-reloads for development

To start the development server, run:

```sh
yarn serve
```

### Compiles and minifies for production

To build the project for production, run:

```sh
yarn build
```

### Lints and fixes files

To lint and fix files, run:

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Project Structure

The project has the following structure:

```
.browserslistrc
.eslintrc.js
.gitignore
babel.config.js
jsconfig.json
package.json
public/
    index.html
README.md
src/
    App.vue
    assets/
        css/
            remedy.css
            variables.css
    components/
        button/
            ButtonComponent.vue
        display/
            DisplayComponent.vue
    main.js
    validation/
        equationValidator.js
    view/
        CalculatorView.vue
vue.config.js
```

## Components

-   **ButtonComponent**: Located at [`src/components/button/ButtonComponent.vue`](src/components/button/ButtonComponent.vue)
-   **DisplayComponent**: Located at [`src/components/display/DisplayComponent.vue`](src/components/display/DisplayComponent.vue)
-   **CalculatorView**: Located at [`src/view/CalculatorView.vue`](src/view/CalculatorView.vue)

## Validation

Validation logic is handled in [`src/validation/equationValidator.js`](src/validation/equationValidator.js).

## Styles

Global styles and variables are defined in:

-   [`src/assets/css/remedy.css`](src/assets/css/remedy.css)
-   [`src/assets/css/variables.css`](src/assets/css/variables.css)

## Main Entry

The main entry point for the application is [`src/main.js`](src/main.js).

## License

This project is licensed under the MIT License.
