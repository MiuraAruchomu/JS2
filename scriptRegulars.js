const init2 = () => {
    const text = "'Ребята, давайте aren't жить дружно', — сказал Леопольд."
    const regExp = /\'/g
    const newText = text.replace(regExp, '"')
    console.log(newText)

    const newRegExp = /[^n]\'[^t]/gi
    const newText2 = text.replace(newRegExp, '"')
    console.log(newText2)
}

window.onload = init2