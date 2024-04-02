<script setup lang="ts">

//stores
import { useUsers } from '@/stores/users'
const store = useUsers();
const { userInfo } = store;
</script>

<template>
    <div>
        <div>
            <p>"{{userInfo.name}}"님</p>
            <p>회원가입이</p>
            <p>왼료되었습니다.</p>
        </div>
        <div>
            <p>이메일 : {{userInfo.email}}</p>
            <p>주소 : {{ userInfo.roadAddress }}</p>
            <p>연락처 :{{ userInfo.ctn }} </p>
        </div>
    </div>
</template>