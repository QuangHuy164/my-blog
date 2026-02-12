const Handlebars = require('handlebars')

module.exports = {
            sum: (a,b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'cil-elevator',
                    asc: 'cil-sort-ascending',
                    desc: 'cil-sort-descending'
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]  
                
                // authentication, HTML escapes the passed string, making it safe for rendering as text within HTML content
                const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
                const output = ` <a href="${href}">
            <i class="${icon}"></i>
          </a>`
                return new Handlebars.SafeString(output)
            }
        }