const MyHelpers = {
    methods: {
        permuta(obj1, obj2) {
            let tmp = _.clone(obj1)
            obj1 = _.clone(obj2)
            obj2 = _.clone(tmp)
            tmp = undefined
        },

    }
}
export default MyHelpers