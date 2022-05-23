<template>
    <div class="row">
        <Tile v-for="el, idx in guess" :key="'tile'+idx+''+rownum" :id="'tile'+idx+''+rownum" :letter="el" :row="rownum" :col="idx"/>
        
    </div>
</template>

<script setup lang="ts">
    import  { useGameStore, ColoredLetter } from "../stores/game";
    import Tile from './Tile.vue';
    const game = useGameStore();
    const props = defineProps<{
        guess: ColoredLetter[],
        rownum: number
    }>()
    const row = props.rownum;




    
</script>

<style scoped>
    .row{        
        display: flex;
    }
</style>