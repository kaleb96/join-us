<script setup lang="ts">

//stores
import { useUsers } from '@/stores/users'
const store = useUsers();
const { userInfo, checkInfo } = store;

//states
const isNext = ref(false);
const router = useRouter();

//functions
//이메일 확인
const handleEmail = () => {
    
    if(userInfo.email) {

        if(!validateEmail(userInfo.email)) { //fail
            return checkInfo.email = false;
        } 
    } 

    // console.log('store email : ' + userInfo.email);
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
        router.push('/postInfo');

    } else {
        
        isNext.value = true;
        setTimeout(() => {
            isNext.value = false;
        }, 2000)   
    }
}

</script>

<template>
    <Container>
        <div class="container">
            <div class="main">
                <a-space direction="vertical">
                    <div class="input-data">
                        <span class="title">이메일</span>
                        <a-space direction="vertical">
                            <a-input type="text" v-model:value="userInfo.email" @change="handleEmail"></a-input>
                            <a-input v-if="(userInfo.email && !checkInfo.email)" status="error" placeholder="정상적인 이메일 주소가 아닙니다." readonly></a-input>
                        </a-space>
                    </div>
                        
                    <div class="input-data">
                        <span class="title">비밀번호</span>
                        <a-space direction="vertical">
                            <a-input type="password" v-model:value="userInfo.passwd" @change="handlePasswd"></a-input>
                            <a-input v-if="(userInfo.passwd && !checkInfo.passwd)" status="error" placeholder="비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다." readonly></a-input>
                        </a-space>
                    </div>

                    <div class="input-data">
                        <span class=title>비밀번호 확인 </span>
                        <a-space direction="vertical">
                            <a-input type="password" v-model:value="userInfo.confirmPasswd" @change="handleConfirm"></a-input>
                            <a-input v-if="(userInfo.confirmPasswd && !checkInfo.confirmPasswd)" status="error" placeholder="비밀번호를 다시 확인해 주세요." readonly></a-input>
                        </a-space>
                    </div>

                </a-space> 
            </div>
            <div class="btn-footer">
                <a-space direction="vertical">
                    <a-button @click="handleNext">다음</a-button>
                    <a-input status="error" v-if="isNext"  placeholder="입력한 정보를 확인해주세요" readonly></a-input>
                </a-space>
            </div>
        </div>
    </Container>
</template>

<style scoped>

.container {

    display: flex;
    flex-direction: column;
    height: 100vh;
} 

.main {

    display: flex;
    justify-content: center;
    margin-bottom: 500px;
}

.btn-footer{
    display: flex;
    justify-content: center;
}

.btn-footer button {

    background-color: #000000;
    color: white;
    min-width: 500px;
    width: 500px;
}

.input-data {

    display: flex;
    justify-content: space-between;
}

.main input {
    border-radius: 0;
    border: 1px solid;
    margin-bottom: 5px;
}

.input-data button {

    background-color: #000000;
    color: white;
    min-width: 185px;
    width: 185px;
}

.title {
    margin-right: 100px;
}
</style>