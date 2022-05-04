<template>
    <div id="board" >
        <Row v-for="el in settings.guesses" :id="el - 1" />
        
    </div>
</template>

<script setup lang="ts">
    import  { SettingsType } from "../types"
    import { inject, ref } from 'vue';
    import Row from './Row.vue';

    const settings:SettingsType = inject('settings')!;    
    
</script>
<script lang="ts">
    
</script>

<style scoped>
    #board{        
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>