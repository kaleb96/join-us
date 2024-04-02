<script setup lang="ts">

//stores
import { useUsers } from '@/stores/users'
const store = useUsers();
const { userInfo, checkInfo } = store;

//states
const isNext = ref(true);
const router = useRouter();

//functions
//이메일 확인
const handleEmail = () => {
    
    if(userInfo.email) {

        if(!validateEmail(userInfo.email)) { //fail
            return checkInfo.email = false;
        } 
    } 

    console.log('store email : ' + userInfo.email);
    return checkInfo.email = true;
}

//이메일 유효성 검사
const validateEmail = (email :String) => {
    return (email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//비밀번호 확인
const handlePasswd = () => {

    if(userInfo.passwd) {

        let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if(!reg.test(String(userInfo.passwd))) { // 비밀번호 유효성 검사
           
            return checkInfo.passwd = false //fail
        }         
    }
    return checkInfo.passwd = true; //success
}

//비밀번호 재확인 검사
const handleConfirm = () => {

    if(userInfo.confirmPasswd) {

        if(userInfo.passwd != userInfo.confirmPasswd) { 
            return checkInfo.confirmPasswd = false; //fail
        } 
    }
    return checkInfo.confirmPasswd = true; //success
}

//다음버튼 체크
const handleNext = () => {

    if(checkInfo.email && checkInfo.passwd && checkInfo.confirmPasswd) { //모두 일치

        isNext.value = true; //success
        router.push('/DeliveryInfo');

    } else {
        isNext.value = false; //fail
    }
}

</script>
<template>
    <div>
        <a-space direction="vertical">
            <div>
                <span>이메일</span>
                <a-input type="text" v-model:value="userInfo.email" @change="handleEmail"></a-input>
                <a-input v-if="(userInfo.email && !checkInfo.email)" status="error" placeholder="정상적인 이메일 주소가 아닙니다." disabled></a-input>
            </div>
            <div>
                <span>비밀번호</span>
                <a-input type="password" v-model:value="userInfo.passwd" @change="handlePasswd"></a-input>
                <a-input v-if="(userInfo.passwd && !checkInfo.passwd)" status="error" placeholder="비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다." disabled></a-input>
            </div>
            <div>
                <span>비밀번호 확인 </span>
                <a-input type="password" v-model:value="userInfo.confirmPasswd" @change="handleConfirm"></a-input>
                <a-input v-if="(userInfo.confirmPasswd && !checkInfo.confirmPasswd)" status="error" placeholder="비밀번호를 다시 확인해 주세요." disabled></a-input>
            </div>
            <a-button type="primary" @click="handleNext">다음</a-button>
            <a-input v-if="!isNext" status="error" placeholder="입력한 정보를 확인해주세요" disabled></a-input>
        </a-space> 
    </div>
</template>