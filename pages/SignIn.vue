<script setup lang="ts">

//stores
import { useUsers } from '@/stores/users'
const store = useUsers();
const { userInfo } = store;
const ctnNum = ref('');

onMounted(() => {
    
    if(userInfo.ctn) {
        
        let a,b,c;
        if(userInfo.ctn.length == 10) {
            a = userInfo.ctn.substring(0, 3);
            b = userInfo.ctn.substring(3,6);
            c=  userInfo.ctn.substring(6,10);

        } else {

            a = userInfo.ctn.substring(0, 3);
            b = userInfo.ctn.substring(3,7);
            c=  userInfo.ctn.substring(7,11);
        }
        ctnNum.value = `${a}-${b}-${c}`;
    }
})
</script>

<template>
    <Container>
        <div>
            <div class="top">
                <p>"{{userInfo.name}}"님</p>
                <p>회원가입이</p>
                <p>왼료되었습니다.</p>
            </div>
            <div class="bottom">
                <p>이메일 : <a :href="`{{userInfo.email}}`">{{userInfo.email}}</a></p>
                <p>주소 : {{ userInfo.roadAddress }}</p>
                <p>연락처 : {{ ctnNum }} </p>
            </div>
        </div>
    </Container>
</template>

<style>
p {
    font-size: 2rem;
    text-align: center;
}

.bottom {

    margin-top: 50px;
}
</style>