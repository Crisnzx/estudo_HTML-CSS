const Modal = {

    em() {

        const element = document.querySelector("#change-subject");
        element.classList.remove("ru");
        element.classList.add("em");

    },
    ru() {
        const element = document.querySelector("#change-subject");
        element.classList.remove("em");
        element.classList.add("ru");
    }
}