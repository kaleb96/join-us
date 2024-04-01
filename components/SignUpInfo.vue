<script setup lang="ts">

//states
const email = ref('');
const passwd = ref('');
const confirmPasswd = ref('');
const isEmailChecked = ref(true);
const isPasswdChecked = ref(true);
const isPasswdConfirmed = ref(true);
const isNext = ref(true);
const router = useRouter();

//functions
//이메일 확인
const handleEmail = () => {
    
    if(email.value) {

        if(!validateEmail(email.value)) { //fail
            return isEmailChecked.value = false;
        } 
    } 

    return isEmailChecked.value = true; //success
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
           
            return isPasswdChecked.value = false //fail
        }         
    }
    return isPasswdChecked.value = true; //success
}

//비밀번호 재확인 검사
const handleConfirm = () => {

    if(confirmPasswd.value) {

        if(passwd.value != confirmPasswd.value) { 
            return isPasswdConfirmed.value = false; //fail
        } 
    }
    return isPasswdConfirmed.value = true; //success
}

//다음버튼 체크
const handleNext = () => {

    if(isEmailChecked.value && isPasswdChecked.value && isPasswdConfirmed.value) {

        isNext.value = true; //success
        // console.log('all true');
        router.push('/DeliveryInfo');
    } else {
        // console.log('아님 ' + { isEmailChecked, isPasswdChecked, isPasswdConfirmed});
        isNext.value = false; //fail
    }
}

</script>

<template>
    <div>
        <a-space direction="vertical">
            <div>
                <span>이메일</span>
                <a-input type="text" v-model:value="email" @change="handleEmail"></a-input>
                <a-input v-if="!isEmailChecked" status="error" placeholder="정상적인 이메일 주소가 아닙니다." disabled></a-input>
            </div>
            <div>
                <span>비밀번호</span>
                <a-input type="password" v-model:value="passwd" @change="handlePasswd"></a-input>
                <a-input v-if="!isPasswdChecked" status="error" placeholder="비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다." disabled></a-input>
            </div>
            <div>
                <span>비밀번호 확인 </span>
                <a-input type="password" v-model:value="confirmPasswd" @change="handleConfirm"></a-input>
                <a-input v-if="!isPasswdConfirmed" status="error" placeholder="비밀번호를 다시 확인해 주세요." disabled></a-input>
            </div>
            <a-button type="primary" @click="handleNext">다음</a-button>
            <a-input v-if="!isNext" status="error" placeholder="입력한 정보를 확인해주세요" disabled></a-input>
        </a-space> 
    </div>
</template>