import vue2datepicker from "vue2-datepicker"
import "vue2-datepicker/index.css"
import "vue2-datepicker/locale/pt-br"
const datePickerConfig = {
    components:{
        vue2datepicker: vue2datepicker
    },
    data(){
        return {
            horarioComercial :{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                format: 'HH:mm' 
            },
            dtpFormat : ['DD/MM/YYYY HH:mm','DD/MM/YYYY','HH:mm:ss'],
            dtpType:["datetime","date","time"]
        }
    }
}
export default datePickerConfig