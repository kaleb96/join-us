<script setup lang="ts">

onMounted(()=> { //Daum 우편 검색
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.head.appendChild(script);
})

//stores
import { useUsers } from '@/stores/users'
const store = useUsers();
const { userInfo, checkInfo } = store;

//states
const router = useRouter();

//functions
//이름 유효성 검사
const handleName = () => {

    if(userInfo.name) {

        let reg = /^(?:[가-힣]{2,}|[a-zA-Z]{3,})$/;
        
        if(!reg.test(userInfo.name)) { //fail
            return checkInfo.name = false
        } 
    }
    return checkInfo.name = true; //success
}

//연락처 유호성 검사
const handleCtn = () => {

    if(userInfo.ctn) {

        let reg = /^0\d{2}[ -]?\d{3,4}[ -]?\d{4}$/;
        // console.log('test is = ' + reg.test(String(ctn.value)))

        if(!(reg.test(userInfo.ctn))) { //false
            return checkInfo.ctn = false;
        }
    } 

    return checkInfo.ctn = true; //success
}

//Daum 우편번호 검색
const postOpen = () => {

  new daum.Postcode({
    
    oncomplete: (data: any) => {
    
        if(data) {
            userInfo.roadAddress = data.roadAddress;
            userInfo.zoneCode = data.zonecode;
        }
    }
  }).open();
}

const goNext = () => {

    if(userInfo.roadAddress && userInfo.zoneCode && checkInfo.name && checkInfo.ctn) {
        router.push('/PayInfo');
    }
}
</script>

<template>
    <Container>
        <div class="container">
            <div class="main">
                <a-space direction="vertical">
                    <div class="input-data">
                        <span class="title">이름</span>
                        <a-space direction="vertical">
                            <a-input type="text" v-model:value="userInfo.name" @change="handleName"></a-input>
                            <a-input class="error" v-if="(userInfo.name && !checkInfo.name)" placeholder="이름을 다시 확인 해주세요" readonly></a-input>
                        </a-space>
                    </div>

                    <div class="input-data">
                        <span class="title">연락처</span>
                        <a-space direction="vertical">
                            <a-input type="text" v-model:value="userInfo.ctn" @change="handleCtn"></a-input>
                            <a-input class="error" v-if="(userInfo.ctn && !checkInfo.ctn)" placeholder="연락처를 다시 확인 해주세요" readonly></a-input>
                        </a-space>
                    </div>
                    <div class>
                        <div class="input-data">
                            <span>주소</span>
                            <a-button @click="postOpen">우편번호</a-button>
                        </div>
                        <div class="post">
                            <a-input type="text" readonly v-model:value="userInfo.roadAddress"></a-input>
                            <a-input type="text" readonly v-model:value="userInfo.zoneCode"></a-input>
                        </div>
                    </div>   
                </a-space>
            </div>
            <div class="btn-footer">
                <a-button><Nuxt-link to='/'>이전</Nuxt-link></a-button>
                <a-button @click="goNext">다음</a-button>
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
    min-width: 250px;
    width: 250px;
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

.post {
    margin-top: 10px;
}

.input-data button {
    
    background-color: #000000;
    color: white;
    min-width: 185px;
    width: 185px;
}

.error {
    color: red;
}
</style>