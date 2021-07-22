async function getData() {
    const url = 'https://reqres.in/api/users'
    const data = await fetch(url)
    return data.json()
}

QUnit.test('Data from api not empty', async assert => {
    let temp
    await getData().then(data => {
        if (data.data) temp = data.data
    })
    assert.true(temp.length > 0, true, 'Not empty')
})

QUnit.test('Data from api is an object', async assert => {
    let temp
    await getData().then(data => {
        if (data.data) temp = data.data
    })
    assert.true(typeof temp === 'object', true, 'Is an object')
})