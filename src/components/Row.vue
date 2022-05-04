<template>
    <div class="row">
        <Tile v-for="el in settings.length" :id="el - 1" />
    </div>
</template>

<script setup lang="ts">
    import  { SettingsType } from "../types"
    import Tile from './Tile.vue';
    import { inject } from 'vue';
    const settings:SettingsType = inject('settings')!;    
</script>

<style scoped>
    .row{        
        display: flex;
    }
</style>