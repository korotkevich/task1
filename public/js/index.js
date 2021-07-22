class Api {
    ERROR_STATUS = 'Error'
    OK_STATUS = 'Ok'

    constructor(options) {
        if (!options.baseUrl && !options.baseUrl.length) {
            new Error('Field Base url does not exist')
        }
        this.options = {...options}
    }

    async getUsers(url, reply) {
        try {
            const response = await fetch(`${this.options.baseUrl}${url}`)
            if (response.ok) {
                const json = await response.json()
                reply(this._generateOKResponse(json))
            } else {
                reply(this._generateErrorResponse(response))
            }

        } catch (e) {
            reply(this._generateErrorResponse(e))
        }
    }

    _generateOKResponse(data) {
        return {
            status: this.OK_STATUS,
            response: data
        }
    }

    _generateErrorResponse(data) {
        return {
            error: data.message ?? '',
            status: this.ERROR_STATUS,
            response: data
        }
    }
}

const api = new Api({baseUrl: 'https://reqres.in/'})

function toggleUserInfo() {
    const listContainer = document.getElementsByClassName('list')[0]

    listContainer.onclick = e => {
        const target = e.target.closest('.list-item')

        if (target) {
            target.getElementsByTagName('p')[0].classList.toggle('hidden')
        }
    }
}
api.getUsers('api/users', response => {
    const listContainer = document.getElementsByClassName('list')[0]
    if (response.status === 'Ok') {
        const templateScript = document.getElementById('users-list').innerHTML
        const   template = Handlebars.compile(templateScript)
        listContainer.innerHTML = template(response.response)

       toggleUserInfo()
    } else {
        listContainer.innerHTML = '<p>Something went wrong</p>'
    }
})
