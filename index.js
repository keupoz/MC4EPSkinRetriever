const ENDPOINT = "https://keupoztest.herokuapp.com/mc4ep";

/**
 * Get skin from MC4EP
 * @param {string} username
 * @param {string} password
*/
async function getSkin(username, password) {
    const result = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    if (result.status === 200) {
        return await result.blob();
    }

    return await result.json();
}

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async function onSubmit(e) {
    e.preventDefault();

    const username = this.elements["username"].value,
        password = this.elements["password"].value;

    const skin = await getSkin(username, password);

    if (!skin) return alert("Не получилось скачать скин. Проверьте никнейм и пароль");

    saveAs(skin, `${username}.png`);
});
