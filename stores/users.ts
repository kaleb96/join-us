
import { defineStore } from 'pinia'

export const useUsers = defineStore('users', () => {


    const userInfo = reactive<string>({
        email: '',
        passwd: '',
        confirmPasswd : '',
        name: '',
        ctn : '',
        zoneCode : '',
        roadAddress : ''
    })

    const checkInfo = reactive<boolean>({
      
        email: false,
        passwd : false,
        confirmPasswd : false,
        name : false,
        ctn : false,
        card : false,
        cardValid : false
    })

    const cardInfo = reactive({

        no1 : '',
        no2 : '',
        no3 : '',
        no4 : ''

    })

    return { userInfo, checkInfo, cardInfo }
})