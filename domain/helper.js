const REQUIRED = (attr)=> {
    if (attr===undefined) throw new Error(`ERR_REQUIRED_PARAM`)
    else return attr
}
const NON_IMPLEMENTED = () => {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
}

module.exports = {REQUIRED,NON_IMPLEMENTED}