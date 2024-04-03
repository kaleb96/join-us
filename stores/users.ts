
import { defineStore } from 'pinia'

export const useUsers = defineStore('users', () => {

    interface UserInfo { //유저정보

        email: string;
        passwd: string;
        confirmPasswd : string;
        name: string;
        ctn: string;
        zoneCode: string;
        roadAddress: string;
    }

    interface CheckInfo {//페이지 확인정보

        email: boolean,
        passwd : boolean,
        confirmPasswd : boolean,
        name : boolean,
        ctn : boolean,
        card : boolean,
        cardValid : boolean
    }

    interface CardInfo {// 카드 정보

        no1 : string,
        no2 : string,
        no3 : string,
        no4 : string
    }

    const userInfo: UserInfo = reactive({
        
        email: '',
        passwd: '',
        confirmPasswd : '',
        name: '',
        ctn : '',
        zoneCode : '',
        roadAddress : ''
    })

    const checkInfo: CheckInfo = reactive({
      
        email: false,
        passwd : false,
        confirmPasswd : false,
        name : false,
        ctn : false,
        card : false,
        cardValid : false
    })

    const cardInfo: CardInfo = reactive({

        no1 : '',
        no2 : '',
        no3 : '',
        no4 : ''
    })

    return { userInfo, checkInfo, cardInfo }
})