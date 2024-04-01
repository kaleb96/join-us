<script setup lang="ts">

//state
const email = ref('');
const passwd = ref('');
const confirmPasswd = ref('');
const errorMessage = ref('');
const isEmailChecked = ref(true);
const isPasswdChecked = ref(true);
const isPasswdConfirmed = ref(true);

//functions
//이메일 확인
const handleEmail = () => {
    
    if(email.value) {

        if(!validateEmail(email.value)) { //불일치
            return isEmailChecked.value = false;
        } 
    } 

    return isEmailChecked.value = true; //일치
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

    if(passwd.value) {

        let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if(!reg.test(String(passwd.value))) { // 비밀번호 유효성 검사
            //불일치
            errorMessage.value = '비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.';
            return isPasswdChecked.value = false
        }         
    }
    return isPasswdChecked.value = true; //일치
}

//비밀번호 재확인 검사
const handleConfirm = () => {

    if(confirmPasswd.value) {

        if(passwd.value != confirmPasswd.value) { // 불일치
            return isPasswdConfirmed.value = false;
        } 
    }
    return isPasswdConfirmed.value = true; //일치
}
</script>

<template>
    <div>
        <a-space direction="vertical">
            <div>
                <span>이메일</span>
                <a-input type="text" v-model:value="email" @change="handleEmail"></a-input>
                <a-input v-if="!isEmailChecked" status="error" placeholder="정상적인 이메일 주소가 아닙니다."></a-input>
            </div>
            <div>
                <span>비밀번호</span>
                <a-input type="password" v-model:value="passwd" @change="handlePasswd"></a-input>
                <a-input v-if="!isPasswdChecked" status="error" placeholder="비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다."></a-input>
            </div>
            <div>
                <span>비밀번호 확인 </span>
                <a-input type="password" v-model:value="confirmPasswd" @change="handleConfirm"></a-input>
                <a-input v-if="!isPasswdConfirmed" status="error" placeholder="비밀번호를 다시 확인해 주세요."></a-input>
            </div>
            <a-button type="primary">
                <NuxtLink to="/DeliveryInfo">다음</NuxtLink>
            </a-button>
        </a-space>
    </div>
</template>