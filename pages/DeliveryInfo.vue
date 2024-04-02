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
    <div>
        <a-space direction="vertical">
            <div>
                <span>이름</span>
                <a-input type="text" v-model:value="userInfo.name" @change="handleName"></a-input>
                <a-input v-if="(userInfo.name && !checkInfo.name)" placeholder="이름을 다시 확인 해주세요" disabled></a-input>
            </div>
            <div>
                <span>연락처</span>
                <a-input type="text" v-model:value="userInfo.ctn" @change="handleCtn"></a-input>
                <a-input v-if="(userInfo.ctn && !checkInfo.ctn)" placeholder="연락처를 다시 확인 해주세요" disabled></a-input>
            </div>
            <div>
                <span>주소</span>
                <a-button @click="postOpen">우편번호</a-button>
                <a-input type="text" readonly v-model:value="userInfo.roadAddress"></a-input>
                <a-input type="text" readonly v-model:value="userInfo.zoneCode"></a-input>
            </div>
            <div>
                <a-button><Nuxt-link to='/'>이전</Nuxt-link></a-button>
                <a-button @click="goNext">다음</a-button>
            </div>
        </a-space>
    </div>
</template>