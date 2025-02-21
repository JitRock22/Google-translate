const selectTag = document.querySelectorAll("select"),
    button = document.querySelector("button");
const fromtext = document.querySelector(".from-text");
const totext = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".fas");

selectTag.forEach((tag, id) => {

    for (const code in countries) {
        let selected;
        if (id == 0 && code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${code}" ${selected}>${countries[code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});
exchange.addEventListener("click", () => {
    let temp = fromtext.value;
    let templang = selectTag[0].value;
    fromtext.value = totext.value;
    selectTag[0].value = selectTag[1].value;
    totext.value = temp;
    selectTag[1].value = templang;
});
button.addEventListener("click", () => {
    const text = fromtext.value;
    const translatefrom = selectTag[0].value;
    const translateto = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`
    console.log(apiUrl);
    fetch(apiUrl).then(res => res.json()).then(data => {
        totext.value = data.responseData.translatedText;
    });
});
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromtext.value);
                alert(`${fromtext.value} Copied`);
            } else {
                navigator.clipboard.writeText(totext.value);
                alert(`${totext.value} Copied`);
            }
        } else if (target.classList.contains("fa-volume-up")) {
            if (target.id == "from") {
                utterance=new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang=selectTag[0].value;
            } else {
                utterance=new SpeechSynthesisUtterance(totext.value);
                utterance.lang=selectTag[1].value;
            }
            speechSynthesis.speak(utterance); //speak the passed utterance
        }
    });
})
